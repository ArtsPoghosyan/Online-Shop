import React, {useEffect, useState} from "react";
import { useSelector, useDispatch} from "react-redux";
import { GetStateApi } from "../../redux/slice/userSlice/UserReducer";
import "../../scss/style.scss";
import Header from "./Header"; import Loading from "./Loading";
import Product from "./Product";
import { GetProductsApi } from "../../redux/slice/productSlice/ProductReducer";
import SearchComp from "./SearchComP";
import SuccesMessage from "./SuccesMessage";
import ErrorMessage from "./ErrorMessage";

function Main(){ 
    const user = useSelector( state => state.user);
    const products = useSelector(state => state.products.products);
    const [burgerMenu, setBurgerMenu] = useState(false);
    const [carts, setCarts] = useState(JSON.parse(localStorage.getItem("carts")) || []);

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(GetStateApi());
        dispatch(GetProductsApi());
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
                        <div className={burgerMenu ? "productMain productMain2" : "productMain"}>
                            <div className="productsDiv">
                                <h1>Featured Prodcuts</h1>
                                <div className="productsDivs">
                                    {
                                        products ? (
                                            products.map((evt)=>{
                                                return <Product product={evt} carts={carts} setcarts={(arr)=>setCarts(arr)} />
                                            })
                                        ) : <Loading />
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

export default Main;