import React, {useEffect, useState} from "react";
import { useSelector, useDispatch} from "react-redux";
import { GetStateApi } from "../../redux/slice/userSlice/UserReducer";
import "../../scss/style.scss";
import Header from "./Header"; import Loading from "./Loading";
import SearchComp from "./SearchComP";

function Shipping(){ 
    const [burgerMenu, setBurgerMenu] = useState(false);
    const user = useSelector( state => state.user);
    const address = JSON.parse(localStorage.getItem("address"));

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
                                <h1>Shipping Address</h1>
                                <form onSubmit={(evt)=>{
                                    evt.preventDefault();
                                    localStorage.setItem("address", JSON.stringify({name: evt.currentTarget[0].value, address: evt.currentTarget[1].value, city: evt.currentTarget[2].value, code: evt.currentTarget[3].value, country: evt.currentTarget[4].value}))
                                    document.location.href = "/payment";
                                }}>
                                    <label htmlFor="name">Full Name</label>
                                    <input type="text" id="name" required defaultValue={address ? address.name : ""}/>
                                    <label htmlFor="address">Address</label>
                                    <input type="text" id="address" required defaultValue={address ? address.address : ""}/>
                                    <label htmlFor="City">City</label>
                                    <input type="text" id="City" required defaultValue={address ? address.city : ""}/>
                                    <label htmlFor="code">Postal Code</label>
                                    <input type="text" id="code" required defaultValue={address ? address.code : ""}/>
                                    <label htmlFor="Country">Country</label>
                                    <input type="text" id="Country" required defaultValue={address ? address.city : ""}/>
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

export default Shipping;