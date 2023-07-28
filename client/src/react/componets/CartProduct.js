import React from "react";
import "../../scss/style.scss";

function CartProduct({product, removeCount, addCount, removeProduct}){
    
    return (
        <div className="productCart">
            <div className="infoDiv">
                <img src={product.productImg} />
                <a href={`/one-product-${product._id}`}>{product.name}</a>
            </div>
            <div className="btnsDiv">
                <button onClick={()=>{
                    removeCount(product._id)
                }}>-</button>
                <p>{product.count}</p>
                <button onClick={()=>{
                    addCount(product._id)
                }}>+</button>
            </div>
            <h3>${product.price}</h3>
            <button onClick={()=>{
                removeProduct(product._id)
            }}>Delete</button>
        </div>
    )
}

export default CartProduct;