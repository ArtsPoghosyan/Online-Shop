import React, {useEffect, useState} from "react";
import { useSelector, useDispatch} from "react-redux";
import { GetStateApi } from "../../redux/slice/userSlice/UserReducer";
import "../../scss/style.scss";
import Header from "./Header"; import Loading from "./Loading";
import { GetOrdersApi } from "../../redux/slice/orderSlice/OrderReducer";
import OrderHistoryItem from "./OrderHistoryItem";
import SearchComp from "./SearchComP";

function HistoryOrders(){ 
    const [burgerMenu, setBurgerMenu] = useState(false);
    const user = useSelector( state => state.user);
    const orders = useSelector( state => state.orders.orders);
    const [carts, setCarts] = useState(JSON.parse(localStorage.getItem("carts")) || []);
    if(user.auth === false){
        document.location.href = "/";
    }
    
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(GetStateApi());
        dispatch(GetOrdersApi());
    }, []);

    return (<>
        {
            user.show && user.auth && orders ? (
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
                                <h1>Order History</h1> 
                                <div className="order_history_div">
                                    <div className="orderCart">
                                        <h2>ID</h2>
                                        <h2>DATE</h2>
                                        <h2>TOTAL</h2>
                                        <h2>PAID</h2>
                                        <h2>DELIVERED</h2>
                                        <h2>ACTIONS</h2>
                                    </div>
                                    {
                                        orders ? (
                                            orders.map((evt)=>{
                                                return <OrderHistoryItem order={evt} />
                                            })
                                        ) : null
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
}

export default HistoryOrders;