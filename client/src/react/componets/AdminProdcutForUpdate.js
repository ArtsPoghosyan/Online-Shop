import React, {useEffect, useState} from "react";
import { useSelector, useDispatch} from "react-redux";
import { GetStateApi } from "../../redux/slice/userSlice/UserReducer";
import "../../scss/style.scss";
import Header from "./Header"; 
import Loading from "./Loading";
import { GetOneProductApi, UpdateProductApi, UpdateProducwithPhotoApi } from "../../redux/slice/productSlice/ProductReducer";
import SearchComp from "./SearchComP";
import { useParams } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import SuccesMessage from "./SuccesMessage";

function UpdateProductAdmin(){ 
    const user = useSelector( state => state.user);
    if(user.isAdmin === false){
        document.location.href = "/";
    }

    const product = useSelector(state => state.products.product);
    const message = useSelector(state => state.products);
    const [bolean, setBolean] = useState(false);
    const [burgerMenu, setBurgerMenu] = useState(false);
    const [carts, setCarts] = useState(JSON.parse(localStorage.getItem("carts")) || []);
    const {productId} = useParams();
    
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(GetStateApi());
        dispatch(GetOneProductApi(productId));
    }, []);

    return (<>
        {
            user.show && user.isAdmin && product ? (
                <div className="mainDiv">
                    { user.errorMessage ? <ErrorMessage message={user.errorMessage} />: null}
                    { user.succesMessage ? <SuccesMessage message={user.succesMessage} />: null}
                    { message.errorMessage ? <ErrorMessage message={message.errorMessage} />: null}
                    { message.succesMessage ? <SuccesMessage message={message.succesMessage} />: null}
                    {
                        <div className={burgerMenu ? "burgerMenuActive burgerMenu" : "burgerMenu"}>
                            <SearchComp />
                        </div>
                    }
                    <div className={burgerMenu ? "mainDivRight mainDivRight2" : "mainDivRight"}>
                        <Header cartsCount={carts.length} user={user} burger={ ()=> setBurgerMenu(!burgerMenu) } burgerMenu={burgerMenu}/>  
                        <div className={burgerMenu ? "productMain productMain2" : "productMain"} id="sign">
                            <div className="signin_div">
                                <h1>Update Product</h1>
                                <form onSubmit={(evt)=>{
                                    evt.preventDefault();
                                    if(bolean){
                                        return dispatch(UpdateProducwithPhotoApi(product._id, {name: evt.currentTarget[0].value, price: evt.currentTarget[1].value, description: evt.currentTarget[2].value, category: evt.currentTarget[3].value, productImg: evt.currentTarget[4].files[0], oldImg: product.productImg}));
                                    }
                                    dispatch(UpdateProductApi({id: product._id, name: evt.currentTarget[0].value, price: evt.currentTarget[1].value, description: evt.currentTarget[2].value, category: evt.currentTarget[3].value}));
                                }}>
                                    <label htmlFor="name">Name</label>
                                    <input type="text" id="name" defaultValue={product.name} required/>
                                    <label htmlFor="price">Price</label>
                                    <input type="number" id="price" defaultValue={product.price} required/>
                                    <label htmlFor="description">Description</label>
                                    <input type="text" id="description" defaultValue={product.description} required/>
                                    <label htmlFor="category">Category</label>
                                    <input type="text" id="category" defaultValue={product.category} required/>
                                    <label htmlFor="img"><img id="photoProd" src={product.productImg} style={{height: "auto", width: "100%", objectFit: "cover"}}></img>Product photo</label>
                                    <input type="file" id="img" onChange={(evt)=>{
                                        const photo = document.getElementById("photoProd");
                                        photo.src=URL.createObjectURL(evt.target.files[0]);
                                        setBolean(true);
                                    }}/>
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

export default UpdateProductAdmin;