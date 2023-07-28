import React, {useEffect, useState} from "react";
import { useSelector, useDispatch} from "react-redux";
import { GetStateApi } from "../../redux/slice/userSlice/UserReducer";
import "../../scss/style.scss";
import Header from "./Header"; import Loading from "./Loading";
import Product from "./Product";
import { GetSearchProductsApi } from "../../redux/slice/productSlice/ProductReducer";
import queryString from "query-string";
import SearchComp from "./SearchComP";
import ErrorMessage from "./ErrorMessage";
import SuccesMessage from "./SuccesMessage";

function Search(){ 
    const user = useSelector( state => state.user);
    const products = useSelector(state => state.products.products);
    const [burgerMenu, setBurgerMenu] = useState(false);
    const [carts, setCarts] = useState(JSON.parse(localStorage.getItem("carts")) || []);
    
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(GetStateApi());
        dispatch(GetSearchProductsApi(document.location.search));
    }, []);

    useEffect(()=>{
        dispatch(GetSearchProductsApi(document.location.search));
    }, document.location.search);

    return (
        <>
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
                                <div className="searchDiv">
                                    <div className="search_left">
                                        <div>
                                            <h2>Department</h2>
                                            <a onClick={(evt)=>serachHandle("category", "all")}>Any</a>
                                            <a onClick={(evt)=>serachHandle("category", "pants")}>Pants</a>
                                            <a onClick={(evt)=>serachHandle("category", "shirt")}>Shirts</a>
                                            <a onClick={(evt)=>serachHandle("category", "botas")}>Botas</a>
                                        </div>
                                        <div>
                                            <h2>Price</h2>
                                            <a onClick={(evt)=>serachHandle("price", "all")}>Any</a>
                                            <a onClick={(evt)=>serachHandle("price", "1-50")}>$1 to $50</a>
                                            <a onClick={(evt)=>serachHandle("price", "51-200")}>$51 to $200</a>
                                            <a onClick={(evt)=>serachHandle("price", "201-500")}>$201 to $500</a>
                                        </div>
                                        <div id="ratesDiv">
                                            <h2>Avg. Customer Review</h2>
                                            <a onClick={(evt)=>serachHandle("rating", "all")}>Any</a>
                                            <a onClick={(evt)=>serachHandle("rating", "4")}><img src={"/rating/stars-4.png"}/> & UP</a>
                                            <a onClick={(evt)=>serachHandle("rating", "3")}><img src={"/rating/stars-3.png"}/> & UP</a>
                                            <a onClick={(evt)=>serachHandle("rating", "2")}><img src={"/rating/stars-2.png"}/> & UP</a>
                                            <a onClick={(evt)=>serachHandle("rating", "1")}><img src={"/rating/stars-1.png"}/> & UP</a>
                                            <a onClick={(evt)=>serachHandle("rating", "0")}><img src={"/rating/stars-0.png"}/> & UP</a>
                                        </div>
                                    </div>
                                    <div className="search_right">
                                        <div className="search_right_top">
                                            <div className="search_text">{products.length === 0 ? "No Results" + serchText() : products.length + " Results" + serchText()} {document.location.search ? <button onClick={()=>document.location.href = "/search"}>X</button> : null}</div>
                                            <div className="search_sort">Sort By
                                            <select id="sort" onChange={(evt)=>serachHandle("sort", evt.target.value)}>
                                                <option>Select Sort</option>
                                                <option value="newest">newest arrivals</option>
                                                <option value="lowest">price: low to high</option>
                                                <option value="highest">price: high to low</option>
                                                <option value="top">avg. customer reviews</option>
                                            </select>
                                            </div>
                                        </div>
                                        <div className="search_right_bottom">
                                            {
                                                products ? products.length >= 1 ?(
                                                    products.map((evt)=>{
                                                        return <Product product={evt} carts={carts} setcarts={(arr)=>setCarts(arr)} />
                                                    })
                                                ) : <div className="nofoundproduct">No Product Found</div> : <Loading />
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

function serchText(){
    const parsed = queryString.parse(document.location.search);
    const keys = Object.keys(parsed);
    let result = "";
    keys.forEach(evt=>{
        result += " : " + parsed[evt];
    });

    return result;
}
function serachHandle(type, search){
    const parsed = queryString.parse(document.location.search);
    let query = document.location.search || "?";
    if(parsed[type]){
        let href = query.replace((type + "=" + parsed[type]), type + "=" + search);
        document.location.search = href;
        return;
    }
    document.location.href = "/search" + query + `&${type}=${search}`;
}
export default Search;