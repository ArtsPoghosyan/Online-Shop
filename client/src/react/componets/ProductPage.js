import React, {useEffect, useState} from "react";
import { useSelector, useDispatch} from "react-redux";
import { GetStateApi } from "../../redux/slice/userSlice/UserReducer";
import "../../scss/style.scss";
import Header from "./Header"; 
import Loading from "./Loading";
import Review from "./Review";
import { AddReviewInProduct, GetOneProductApi } from "../../redux/slice/productSlice/ProductReducer";
import { useParams } from "react-router-dom";
import SearchComp from "./SearchComP";
import ErrorMessage from "./ErrorMessage";
import SuccesMessage from "./SuccesMessage";

function ProductPage(){ 
    const user = useSelector( state => state.user);
    const products = useSelector(state => state.products.product);
    const message = useSelector(state => state.products);
    const [burgerMenu, setBurgerMenu] = useState(false);
    const [carts, setCarts] = useState(JSON.parse(localStorage.getItem("carts")) || []);
    const { id } = useParams();

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(GetOneProductApi(id));
        dispatch(GetStateApi());
    }, []);

    return (<>
        {
            user.show ? (
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
                        <div className={burgerMenu ? "productMain productMain2" : "productMain"}>
                            {
                                products ? (
                                    <>
                                    <div className="oneProduct_div">
                                        <img className="bigProductImg" src={products.productImg}/>
                                        <div className="productDescription">
                                            <h1>{products.name}</h1>
                                            <div className="gicDiv"></div>
                                            <div className="ratingDiv">
                                                <img src={products.ratingImg} /> {products.reviews.length} reviews 
                                            </div>
                                            <div className="gicDiv"></div>
                                            <p className="moneyDiv">Price : ${products.price}</p>
                                            <div className="gicDiv"></div>
                                            <img className="smallProductImg" src={products.productImg}/>
                                            <div className="gicDiv"></div>
                                            <p className="descDiv">{products.description}</p>
                                        </div>
                                        <div className="addCartDiv">
                                            <div className="priceDiv">
                                                <p>Price</p>
                                                <p>${products.price}</p>
                                            </div>
                                            <div className="gicDiv"></div>
                                            <div className="statusDiv">
                                                <p>Status:</p>
                                                <p className={products.isActive ? "yes" : "no"}>{products.isActive ? "In Stock" : "Unavailable" }</p> 
                                            </div>
                                            <div className="gicDiv"></div>
                                            {
                                                products.isActive ? <button onClick={()=>{
                                                    let bolean = false;
                                                    const arr = carts.map((evt)=>{
                                                        if(evt._id === products._id){
                                                            bolean = !bolean;
                                                            return {...evt, count: evt.count + 1};
                                                        }
                                                        return evt;
                                                    });
                                                    if(!bolean){
                                                        arr.push({...products, count: 1});
                                                    }
                                                    
                                                    localStorage.setItem("carts", JSON.stringify(arr));
                                                    setCarts(arr);
                                                }}>Add to cart</button> : null
                                            }
                                        </div>
                                    </div>

                                    <div className="review_div">
                                        <h1 className="texth1">Reviews</h1>
                                        <div className="reviews_divs">
                                            {
                                                products.reviews.map((evt)=>{
                                                    return <Review key={evt.userId} revie={evt}/>
                                                })
                                            }
                                        </div>
                                    </div>
                                    {
                                        user.auth ? (
                                            <div className="review_div review_div2">
                                                <h1 className="texth1">Write a customer review</h1>

                                                <form onSubmit={(evt)=>{
                                                    evt.preventDefault();
                                                    const rate = document.getElementById("rate").value;
                                                    if(rate === "Select"){
                                                        alert("select your rate");
                                                        return;
                                                    }
                                                    const text = document.getElementById("textReview").value;
                                                    const review = {
                                                        userId: user._id,
                                                        userName: user.name,
                                                        description: text,
                                                        dataCreated: new Date(),
                                                        rateImg: "/rating/stars-" + rate + ".png",
                                                        rate: +rate
                                                    }
                                                    dispatch(AddReviewInProduct(products._id, review));
                                                }}>
                                                    <label htmlFor="rate">Rating</label>
                                                    <select id="rate" required>
                                                        <option>Select</option>
                                                        <option value="1">Poor</option>
                                                        <option value="2">Fair</option>
                                                        <option value="3">Good</option>
                                                        <option value="4">Very Good</option>
                                                        <option value="5">Excelent</option>
                                                    </select>
                                                    <textarea placeholder="Comments" id="textReview"/>
                                                    <button>Sumbit</button>
                                                </form>
                                            </div>
                                        ) : null
                                    }
                                </>
                                ) : <Loading />
                            }
                        </div>      
                    </div>          
                </div>
            ) : <Loading />
        }
        </>
    )
}

export default ProductPage;