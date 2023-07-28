import React, {useEffect, useState} from "react";
import { useSelector, useDispatch} from "react-redux";
import { GetStateApi, UserRegisterApi } from "../../redux/slice/userSlice/UserReducer";
import "../../scss/style.scss";
import Header from "./Header"; 
import Loading from "./Loading";
import SearchComp from "./SearchComP";
import ErrorMessage from "./ErrorMessage";
import SuccesMessage from "./SuccesMessage";

function SignUp(){ 
    const [burgerMenu, setBurgerMenu] = useState(false);
    const user = useSelector( state => state.user);

    if(user.auth === true){
        document.location.href = "/";
    }

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(GetStateApi());
    }, []);

    return (<>
            {
                user.show && !user.auth ? (
                    <div className="mainDiv">
                        { user.errorMessage ? <ErrorMessage message={user.errorMessage} />: null}
                        { user.succesMessage ? <SuccesMessage message={user.succesMessage} />: null}
                        {
                            <div className={burgerMenu ? "burgerMenuActive burgerMenu" : "burgerMenu"}>
                                <SearchComp />
                            </div>
                        }
                        <div className={burgerMenu ? "mainDivRight mainDivRight2" : "mainDivRight"}>
                            <Header user={user} burger={ ()=> setBurgerMenu(!burgerMenu) } burgerMenu={burgerMenu}/>  
                            <div className={burgerMenu ? "productMain productMain2" : "productMain"} id="sign">
                                <div className="signin_div">
                                    <h1>Sign Up</h1>
                                    <form onSubmit={(evt)=>{
                                        evt.preventDefault();
                                        if(evt.currentTarget[2].value === evt.currentTarget[3].value){
                                            dispatch(UserRegisterApi({name: evt.currentTarget[0].value, email: evt.currentTarget[1].value, password: evt.currentTarget[2].value}));
                                        }else{
                                            alert("passwords don't repeat");
                                        }
                                    }}>
                                        <label htmlFor="name">Name</label>
                                        <input type="text" name="name" id="name" required/>
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name="email" id="email" required/>
                                        <label htmlFor="pass">Password</label>
                                        <input type="password" name="password" id="pass" required/>
                                        <label htmlFor="pass2">Confirm Password</label>
                                        <input type="password" name="password2" id="pass2" required/>
                                        <button>Sign In</button>
                                    </form>
                                    <div>Already have an account? <a href="/signin">Sign In</a></div>
                                </div>
                            </div>      
                        </div>          
                    </div>
                ) : <Loading />
            }
        </>        
    )
}

export default SignUp;