import React, {useEffect, useState} from "react";
import { useSelector, useDispatch} from "react-redux";
import { AddOrderApi } from "../../redux/slice/orderSlice/OrderReducer";
import PlaceorderItem from "./PlaceorderItem";
import "../../scss/style.scss";
import Header from "./Header"; import Loading from "./Loading";
import { GetStateApi } from "../../redux/slice/userSlice/UserReducer";
import SearchComp from "./SearchComP";

function Placeorder(){ 
    const [burgerMenu, setBurgerMenu] = useState(false);
    const user = useSelector( state => state.user);
    const [carts, setCarts] = useState(JSON.parse(localStorage.getItem("carts")) || []);
    const address = JSON.parse(localStorage.getItem("address"));
    const payment = localStorage.getItem("payment");
    let itemsCount = 0;
    let itemsPrice = 0;

    if(user.auth === false){
        document.location.href = "/";
    }

    if(carts){
        const obj = carts.reduce((aggr, evt)=>{
            return {itemsCount: aggr.itemsCount + evt.count, itemsPrice: aggr.itemsPrice + (evt.count * evt.price)}
        }, {itemsCount:0, itemsPrice: 0});
        itemsCount = obj.itemsCount;
        itemsPrice = obj.itemsPrice;
    }

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(GetStateApi());
    }, []);

    return (<>
        {
            user.show && user.auth ? (
                <div className="mainDiv">
                    {
                        <div className={burgerMenu ? "burgerMenuActive burgerMenu" : "burgerMenu"}>
                            <SearchComp />
                        </div>
                    }
                    <div className={burgerMenu ? "mainDivRight mainDivRight2" : "mainDivRight"}>
                        <Header cartsCount={carts.length} user={user} burger={ ()=> setBurgerMenu(!burgerMenu) } burgerMenu={burgerMenu}/>  
                        <div className={burgerMenu ? "productMain productMain2" : "productMain"} id="cart">
                            <div className="shopping_cart">
                                <h1>Preview Order</h1>
                                <div className="shop_divs">
                                    <div className="shoppings_divs">
                                        <div className="shopping_address">
                                            <h3>Shipping</h3>
                                            <strong>Name: {address.name}</strong>
                                            <strong>Address: {address.address}, {address.city}, {address.code}, {address.country}</strong>
                                            <a href="/shipping">Edit</a>
                                        </div>
                                        <div className="shopping_address">
                                            <h3>Payment</h3>
                                            <strong>Method: {payment}</strong>
                                            <a href="/payment">Edit</a>
                                        </div>
                                        <div className="shopping_address shopping_items">
                                            <h3>Items</h3>
                                            {
                                                carts ? (
                                                    carts.map((evt)=>{
                                                        return <PlaceorderItem product={evt} />
                                                    })
                                                ) : null
                                            }
                                            <a href="/cart">Edit</a>
                                        </div>
                                    </div>  
                                    <div className="shopingItemsCount">
                                        <h2>Order Summary</h2>
                                        <div className="divTexts"><p>Items</p> <p>${itemsPrice}</p></div>
                                        <div className="gicDiv"></div>
                                        <div className="divTexts"><p>Shipping</p> <p>$0.00</p></div>
                                        <div className="gicDiv"></div>
                                        <div className="divTexts"><p>Tax</p> <p>${itemsCount * 18}</p></div>
                                        <div className="gicDiv"></div>
                                        <div className="divTexts"><strong>Order Total</strong> <strong>${itemsCount * 18 + itemsPrice}</strong></div>
                                        <div className="gicDiv"></div>
                                        <a className="checkout" onClick={(evt)=>{
                                            if(itemsCount >= 1){
                                                const obj = {
                                                    ...address,
                                                    payment,
                                                    totalPrice: itemsCount * 18 + itemsPrice,
                                                    productsCount: itemsCount,
                                                    productsPrice: itemsPrice,
                                                    userId: user._id,
                                                    products: carts
                                                };
                                                dispatch(AddOrderApi(obj));
                                            }
                                        }}>Place Order</a>
                                    </div>
                                </div>
                            </div>
                            
                        </div>      
                    </div>          
                </div>
            ) : <Loading />
        }
        </>
    )
}

export default Placeorder;