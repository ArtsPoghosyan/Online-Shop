import React, {useEffect, useState} from "react";
import "../../scss/style.scss";
import { useDispatch } from "react-redux";
import { UserLogoutApi } from "../../redux/slice/userSlice/UserReducer";
import queryString from"query-string";

function Header({cartsCount, burger, burgerMenu, user}){
    const [profileBtn, setProfileBtn] = useState(false);
    const dispatch = useDispatch();
    
    return (
        <>
            <div className={burgerMenu ? "headerDiv headerDiv2" : "headerDiv" }>
                <div className="navBar">
                    <div className="navBar_left">
                        <div className="burger_Menu" onClick={()=>burger(!burgerMenu)}><div></div><div></div><div></div></div>
                        <a href="/">amazona</a>
                        <form onSubmit={(evt)=>{
                            evt.preventDefault();
                            if(evt.currentTarget[0].value){
                               serachHandle("name", evt.currentTarget[0].value);
                            }else{
                                removeName();
                            }
                            
                        }}>
                            <input type="text" name="name" placeholder="search product..." defaultValue={searchName()}></input>
                            <button>&</button>
                        </form>
                    </div>
                    <div className="navBar_right">
                        <a href="/cart">Cart {cartsCount ? <div className="cartCount">{cartsCount}</div> : null}</a>
                        { 
                            user.auth ? (
                                <div className="profile_btn" onClick={()=>setProfileBtn(!profileBtn)}>
                                    {user.name} ^
                                    {
                                        profileBtn ? (
                                            <div className="userProfile">
                                                <a href="/profile">User Profile</a>
                                                <a href="/history-order">Order History</a>
                                                {user.isAdmin ? <a href="/admin">Admin Panel</a> : null}
                                                <div className="gic" />
                                                <a onClick={(evt)=>{
                                                    evt.preventDefault();
                                                    dispatch(UserLogoutApi());
                                                }}>Sign Out</a>
                                            </div>  
                                        ) : null
                                    }  
                                </div>
                            ) : <a href="/signin">Sign In</a>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

function searchName(){
    const parsed = queryString.parse(document.location.search);
    return parsed.name;
}
function serachHandle(type, search){ 
    const parsed = queryString.parse(document.location.search);
    let query = document.location.search || "?";
    
    if(parsed[type]){
        let href = query.replace((type + "=" + parsed[type]), type + "=" + search);
        document.location.search = href;
        return;
    }
    document.location.href = ("/search" + query + `&${type}=${search}`);
}
function removeName(){ 
    const parsed = queryString.parse(document.location.search);
    let query = document.location.search || "?";
    
    if(parsed.name){
        let href = query.replace("&name=" + parsed.name, "");
        document.location.search = href;
        return;
    }
    document.location.href = "/search";
}
export default Header;