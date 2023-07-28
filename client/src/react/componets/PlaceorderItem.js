import React from "react";
import "../../scss/style.scss";

function PlaceorderItem({product}){
    
    return (
        <div className="productCart">
            <div className="infoDiv">
                <img src={product.productImg} />
                <a href={`/one-product-${product._id}`}>{product.name}</a>
            </div>
            <h3>{product.count}</h3>
            <h3>${product.price}</h3>
        </div>
    )
}

export default PlaceorderItem;