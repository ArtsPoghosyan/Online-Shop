import React, {useEffect, useState} from "react";
import { useSelector, useDispatch} from "react-redux";
import { GetStateApi } from "../../redux/slice/userSlice/UserReducer";
import "../../scss/style.scss";
import Header from "./Header"; import Loading from "./Loading";
import CartProduct from "./CartProduct";
import SearchComp from "./SearchComP";
import ErrorMessage from "./ErrorMessage";
import SuccesMessage from "./SuccesMessage";

function Cart(){ 
    const [burgerMenu, setBurgerMenu] = useState(false);
    const user = useSelector( state => state.user);
    const [carts, setCarts] = useState(JSON.parse(localStorage.getItem("carts")) || []);
    let itemsCount = 0;
    let itemsPrice = 0;

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
            user.show ? (
                <div className="mainDiv">
                    { user.errorMessage ? <ErrorMessage message={user.errorMessage} />: null}
                    { user.succesMessage ? <SuccesMessage message={user.succesMessage} />: null}
                    {
                        <div className={burgerMenu ? "burgerMenuActive burgerMenu" : "burgerMenu"}>
                            <SearchComp />
                        </div>
                    }
                    <div className={burgerMenu ? "mainDivRight mainDivRight2" : "mainDivRight"}>
                        <Header cartsCount={carts.length} user={user} burger={ ()=> setBurgerMenu(!burgerMenu) } burgerMenu={burgerMenu}/>  
                        <div className={burgerMenu ? "productMain productMain2" : "productMain"} id="cart">
                            <div className="shopping_cart">
                                <h1>Shopping Cart</h1>
                                <div className="shop_divs">
                                    <div className="shoppings_divs">
                                        {
                                            carts.length >= 1 ? (
                                                carts.map((evt)=>{
                                                    return <CartProduct product={evt} 
                                                    removeCount={(id)=>{
                                                        const arr = carts.map((e)=>{
                                                            if(e._id === id){
                                                                return {...e, count: e.count - 1 <= 0 ? 1 : e.count - 1 };
                                                            }
                                                            return e;
                                                        });
                                                        localStorage.setItem("carts", JSON.stringify(arr));
                                                        setCarts(arr);
                                                    }} 
                                                    addCount={(id)=>{
                                                        const arr = carts.map((e)=>{
                                                            if(e._id === id){
                                                                return {...e, count: e.count + 1};
                                                            }

                                                            return e; 
                                                        });
                                                        localStorage.setItem("carts", JSON.stringify(arr));
                                                        setCarts(arr);
                                                    }}
                                                    removeProduct={(id)=>{
                                                        const arr = carts.filter((e)=>{
                                                            if(e._id !== id){
                                                                return e;
                                                            }
                                                        });
                                                        localStorage.setItem("carts", JSON.stringify(arr));
                                                        setCarts(arr);
                                                    }}
                                                />
                                                })
                                            ) : <div className="cartEmpty">Cart is empty. <a href="/">Go Shopping</a></div> 
                                        }
                                    </div>
                                    <div className="shopingItemsCount">
                                        <h2>Subtotal ({itemsCount} items) : ${itemsPrice}</h2>
                                        <div className="gicDiv"></div>
                                        {
                                            carts.length >= 1 ? 
                                                <a className="checkout" href={user.auth ? "/shipping" : "/signin?redirect=/shipping"}>Proceed to checkout</a>
                                                : <a className="noCheckout">Proceed to checkout</a>
                                        }
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

export default Cart;