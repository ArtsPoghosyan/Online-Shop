import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom"
import { useSelector, useDispatch} from "react-redux";
import { GetStateApi } from "../../redux/slice/userSlice/UserReducer";
import "../../scss/style.scss";
import Header from "./Header"; import Loading from "./Loading";
import { GetOneOrderApi, setOrders} from "../../redux/slice/orderSlice/OrderReducer";
import { useParams } from "react-router-dom";
import PlaceorderItem from "./PlaceorderItem";
import SearchComp from "./SearchComP";
import ErrorMessage from "./ErrorMessage";
import SuccesMessage from "./SuccesMessage";
const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });

function Order(){ 
    const [burgerMenu, setBurgerMenu] = useState(false);
    const user = useSelector( state => state.user);
    const order = useSelector( state => state.orders.orders);
    const [carts, setCarts] = useState(JSON.parse(localStorage.getItem("carts")) || []);
    const {orderId} = useParams();

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(GetStateApi());
        dispatch(GetOneOrderApi(orderId));
    }, []);

    return (<>
        {
            user.show && user.auth && order ? (
                <div className="mainDiv">
                    { user.errorMessage ? <ErrorMessage message={user.errorMessage} />: null}
                    { user.succesMessage ? <SuccesMessage message={user.succesMessage} />: null}
                    { order.errorMessage ? <ErrorMessage message={order.errorMessage} />: null}
                    { order.succesMessage ? <SuccesMessage message={order.succesMessage} />: null}
                    {
                        <div className={burgerMenu ? "burgerMenuActive burgerMenu" : "burgerMenu"}>
                            <SearchComp />
                        </div>
                    }
                    <div className={burgerMenu ? "mainDivRight mainDivRight2" : "mainDivRight"}>
                        <Header cartsCount={carts.length} user={user} burger={ ()=> setBurgerMenu(!burgerMenu) } burgerMenu={burgerMenu}/>  
                        <div className={burgerMenu ? "productMain productMain2" : "productMain"} id="cart">
                            <div className="shopping_cart">
                                <h1>Order {order._id}</h1>
                                <div className="shop_divs">
                                    <div className="shoppings_divs">
                                        <div className="shopping_address">
                                            <h3>Shipping</h3>
                                            <strong>Name: {order.name}</strong>
                                            <strong>Address: {order.address}, {order.city}, {order.code}, {order.country}</strong>
                                            <div className={order.isDelivered ? "not_paid paid" : "not_paid"}>{order.isDelivered ? "Delivered" : "Not Delivered"}</div>
                                        </div>
                                        <div className="shopping_address">
                                            <h3>Payment</h3>
                                            <strong>Method: {order.payment}</strong>
                                            <div className={order.isPaid ? "not_paid paid" : "not_paid"}>{order.isPaid ? "Paid" : "Not Paid"}</div>
                                        </div>
                                        <div className="shopping_address shopping_items">
                                            <h3>Items</h3>
                                            {
                                                order ? (
                                                    order.products.map((evt)=>{
                                                        return <PlaceorderItem product={evt} />
                                                    })
                                                ) : null
                                            }
                                            
                                        </div>
                                    </div>  
                                        {
                                            order.isPaid ? null : (
                                                <div className="shopingItemsCount">  
                                                    <h2>Order Summary</h2>
                                                    <div className="divTexts"><p>Items</p> <p>${order.productsPrice}</p></div>
                                                    <div className="gicDiv"></div>
                                                    <div className="divTexts"><p>Shipping</p> <p>$0.00</p></div>
                                                    <div className="gicDiv"></div>
                                                    <div className="divTexts"><p>Tax</p> <p>${order.productsCount * 18}</p></div>
                                                    <div className="gicDiv"></div>
                                                    <div className="divTexts"><strong>Order Total</strong> <strong>${order.totalPrice}</strong></div>
                                                    <div className="gicDiv gicDiv2"></div>
                                                    <PayPalButton
                                                        createOrder={(data, actions) => createOrder(data, actions, order)}
                                                        onApprove={(data, actions) => onApprove(data, actions, order._id)}
                                                    />
                                                </div>
                                            )
                                        }
                                </div>
                            </div>
                            
                        </div>      
                    </div>          
                </div>
            ) : <Loading />
        }
        </>
    )

    function createOrder(data, actions, order) {
        // Order is created on the server and the order id is returned
        return fetch("http://localhost:4000/order/create-paypal-order", {
          method: "POST",
           headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer " + localStorage.getItem("token")
          },
          // use the "body" param to optionally pass additional order information
          // like product skus and quantities
          body: JSON.stringify({
            product: {
                description : "Order - " + order._id,
                cost : order.totalPrice
            }
          }),
        })
        .then((response) => response.json())
        .then((order) => order.id);
      };
      function onApprove(data, actions, id){
         // Order is captured on the server and the response is returned to the browser
         return fetch("http://localhost:4000/order/capture-paypal-order", {
          method: "POST",
           headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer " + localStorage.getItem("token")
          },
          body: JSON.stringify({
            orderID: data.orderID,
            id
          })
        })
        .then((response) => response.json()).then((res)=>{
            dispatch(setOrders({orders: res.order, succesMessage: res.succesMessage}));
        });
      };
}

export default Order;