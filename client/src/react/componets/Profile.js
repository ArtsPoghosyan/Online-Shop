import React, {useEffect, useState} from "react";
import { useSelector, useDispatch} from "react-redux";
import { GetStateApi, UpdateUserApi } from "../../redux/slice/userSlice/UserReducer";
import "../../scss/style.scss";
import Header from "./Header"; import Loading from "./Loading";
import SearchComp from "./SearchComP";
import SuccesMessage from "./SuccesMessage";
import ErrorMessage from "./ErrorMessage";

function Profile(){ 
    const [burgerMenu, setBurgerMenu] = useState(false);
    const user = useSelector( state => state.user);
    const [userData, setUserData] = useState({name: user.name || "", email: user.email || ""});
    const [carts, setCarts] = useState(JSON.parse(localStorage.getItem("carts")) || []);
    
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
                    { user.errorMessage ? <ErrorMessage message={user.errorMessage} />: null}
                    { user.succesMessage ? <SuccesMessage message={user.succesMessage} />: null}
                    {
                        <div className={burgerMenu ? "burgerMenuActive burgerMenu" : "burgerMenu"}>
                            <SearchComp />
                        </div>
                    }
                    <div className={burgerMenu ? "mainDivRight mainDivRight2" : "mainDivRight"}>
                        <Header cartsCount={carts.length} user={user} burger={ ()=> setBurgerMenu(!burgerMenu) } burgerMenu={burgerMenu}/>  
                        <div className={burgerMenu ? "productMain productMain2" : "productMain"} id="sign">
                            <div className="signin_div">
                                <h1>User Profile</h1>
                                <form onSubmit={(evt)=>{
                                    evt.preventDefault();
                                    if(evt.currentTarget[2].value && evt.currentTarget[3].value){
                                        if(evt.currentTarget[2].value === evt.currentTarget[3].value){
                                            const obj = {
                                                id: user._id,
                                                name : userData.name ? userData.name : user.name,  
                                                email : userData.email ? userData.email : user.email,
                                                password : evt.currentTarget[2].value,
                                            }
                                            dispatch(UpdateUserApi(obj));
                                            return;
                                        }
                                        alert("passwords not repeat");
                                        return;
                                    }
                                    const obj = {
                                        id: user._id,
                                        name : userData.name ? userData.name : user.name,  
                                        email : userData.email ? userData.email : user.email 
                                    }
                                    return dispatch(UpdateUserApi(obj));
                                }}>
                                    <label htmlFor="name">Name</label>
                                    <input type="text" id="name" defaultValue={user.name} onChange={(evt)=> setUserData((data)=> ({...data, name: evt.target.value}))}/>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" defaultValue={user.email} onChange={(evt)=> setUserData((data)=> ({...data, email: evt.target.value}))}/>
                                    <label htmlFor="pass">Password</label>
                                    <input type="password" id="pass"/>
                                    <label fhtmlForor="pass2">Confirm Password</label>
                                    <input type="password" id="pass2"/>
                                    <button>Update</button>
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

export default Profile;