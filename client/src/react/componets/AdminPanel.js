import React, {useEffect, useState} from "react";
import { useSelector, useDispatch} from "react-redux";
import { GetStateApi } from "../../redux/slice/userSlice/UserReducer";
import "../../scss/style.scss";
import Header from "./Header"; 
import Loading from "./Loading";
import { AddProductApi, GetProductsApi } from "../../redux/slice/productSlice/ProductReducer";
import SearchComp from "./SearchComP";
import ProductForAdmin from "./ProductForAdmin";
import ErrorMessage from "./ErrorMessage";
import SuccesMessage from "./SuccesMessage";

function AdminPanel(){ 
    const user = useSelector( state => state.user);
    if(user.isAdmin === false){
        document.location.href = "/";
    }
    const products = useSelector(state => state.products);
    const [burgerMenu, setBurgerMenu] = useState(false);
    const [carts, setCarts] = useState(JSON.parse(localStorage.getItem("carts")) || []);
    console.log(products);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(GetStateApi());
        dispatch(GetProductsApi());
    }, []);

    return (<>
        {
            user.show && user.isAdmin ? (
                <div className="mainDiv">
                    { user.errorMessage ? <ErrorMessage message={user.errorMessage} />: null}
                    { user.succesMessage ? <SuccesMessage message={user.succesMessage} />: null}
                    { products.errorMessage ? <ErrorMessage message={products.errorMessage} />: null}
                    { products.succesMessage ? <SuccesMessage message={products.succesMessage} />: null}
                    {
                        <div className={burgerMenu ? "burgerMenuActive burgerMenu" : "burgerMenu"}>
                            <SearchComp />
                        </div>
                    }
                    <div className={burgerMenu ? "mainDivRight mainDivRight2" : "mainDivRight"}>
                        <Header cartsCount={carts.length} user={user} burger={ ()=> setBurgerMenu(!burgerMenu) } burgerMenu={burgerMenu}/>  
                        <div className={burgerMenu ? "productMain productMain2" : "productMain"} id="sign">
                            <div className="signin_div">
                                <h1>Create Product</h1>
                                <form onSubmit={(evt)=>{
                                    evt.preventDefault();
                                    dispatch(AddProductApi({name: evt.currentTarget[0].value, price: evt.currentTarget[1].value, description: evt.currentTarget[2].value, category: evt.currentTarget[3].value, productImg: evt.currentTarget[4].files[0]}));
                                }}>
                                    <label htmlFor="name">Name</label>
                                    <input type="text" id="name"name="name" required/>
                                    <label htmlFor="price">Price</label>
                                    <input type="number" id="price" name="price"required/>
                                    <label htmlFor="description">Description</label>
                                    <input type="text" id="description" name="description"required/>
                                    <label htmlFor="category">Category</label>
                                    <input type="text" id="category" name="category"required/>
                                    <label htmlFor="img"><img id="photoProd" style={{height: "auto", width: "100%", objectFit: "cover"}}></img>Product photo</label>
                                    <input type="file" id="img" name="productImg" onChange={(evt)=>{
                                        const photo = document.getElementById("photoProd");
                                        photo.src=URL.createObjectURL(evt.target.files[0]);
                                    }}/>
                                    <button>Create</button>
                                </form>
                            </div>
                        </div>      
                        <div className={burgerMenu ? "productMain productMain2" : "productMain"}>
                            <div className="productsDiv">
                                <h1>All Prodcuts</h1>
                                <div className="productsDivs">
                                    {
                                        products.products ? (
                                            products.products.map((evt)=>{
                                                return <ProductForAdmin product={evt}/>
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

export default AdminPanel;