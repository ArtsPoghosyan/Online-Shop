import React from "react";
import "../../scss/style.scss";
import { useDispatch} from "react-redux";
import { DeleteProductApi } from "../../redux/slice/productSlice/ProductReducer";

function ProductForAdmin({product}){
    const dispatch = useDispatch();

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
                    <div className="rating">
                        <button className="activeBtn" onClick={() => dispatch(DeleteProductApi({id: product._id, productImg: product.productImg}))}>Delete</button>
                        <button className="activeBtn" style={{marginLeft: "15px"}} onClick={() => document.location.href = `/update-product-${product._id}`}>Update</button>
                    </div>
                </div>
        </div>
    )
}

export default ProductForAdmin;