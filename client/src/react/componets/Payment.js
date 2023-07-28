import React, {useEffect, useState} from "react";
import { useSelector, useDispatch} from "react-redux";
import { GetStateApi } from "../../redux/slice/userSlice/UserReducer";
import "../../scss/style.scss";
import Header from "./Header"; import Loading from "./Loading";
import SearchComp from "./SearchComP";

function Payment(){ 
    const [burgerMenu, setBurgerMenu] = useState(false);
    const user = useSelector( state => state.user);
    const payment = localStorage.getItem("payment");

    if(user.auth === false){
        document.location.href = "/";
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
                        <Header user={user} burger={ ()=> setBurgerMenu(!burgerMenu) } burgerMenu={burgerMenu}/>  
                        <div className={burgerMenu ? "productMain productMain2" : "productMain"} id="sign">
                            <div className="signin_div">
                                <h1>Payment Method</h1>
                                <form onSubmit={(evt)=>{
                                    evt.preventDefault();
                                    localStorage.setItem("payment", evt.currentTarget[0].checked ? "paypal" : "visa");
                                    document.location.href = "/placeorder";
                                }}>
                                    <div>
                                        <input type="radio" id="paypal" name="payment" value="paypal" defaultChecked={payment === "paypal" ? true : false}/>
                                        <label htmlFor="paypal">PayPal</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="visa" name="payment" value="visa" defaultChecked={payment === "visa" ? true : false}></input>
                                        <label htmlFor="visa">Visa</label>
                                    </div>                  
                                    <button>Continue</button>
                                </form>
                            </div>
                        </div>      
                    </div>          
                </div>
            ) : <Loading />
        }
        </>
    )
}

export default Payment;