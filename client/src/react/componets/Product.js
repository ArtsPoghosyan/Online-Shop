import React from "react";
import "../../scss/style.scss";

function Product({product, carts, setcarts}){

    return (
        <div className="product">
                <img className="product_img" src={product.productImg}/>
                <div className="product_footer">
                    <a href={"/one-product-" + product._id}>{product.name}</a>
                    <div className="rating">
                        <img src={product.ratingImg}/>
                        {product.reviews.length} reviwes
                    </div>
                    <h3>${product.price}</h3>
                    <button className={product.isActive ? "activeBtn" : "noActiveBtn"} onClick={()=>{
                        if(product.isActive){
                            let bolean = false;
                            const arr = carts.map((evt)=>{
                                if(evt._id === product._id){
                                    bolean = !bolean;
                                    return {...evt, count: evt.count + 1};
                                }
                                return evt;
                            });
                            if(!bolean){
                                arr.push({...product, count: 1});
                            }
                            
                            localStorage.setItem("carts", JSON.stringify(arr));
                            setcarts(arr);
                        }
                    }}>{product.isActive ? "Add to cart" : "Out of stock" }</button>
                </div>
        </div>
    )
}

export default Product;