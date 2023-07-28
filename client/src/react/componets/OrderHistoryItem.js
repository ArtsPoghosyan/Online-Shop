import React from "react";
import "../../scss/style.scss";

function OrderHistoryItem({order}){
    
    return (
        <div className="orderCart">
            <p>{order._id}</p>
            <p>{order.createdAt ? (order.createdAt + "").split("T")[0] : "yyyy-mm-dd"}</p>
            <p>{order.totalPrice}</p>
            <p>{order.isPaid ? "PAID" : "no"}</p>
            <p>{order.delivered ? "DELIVERED" : "no"}</p>
            <button onClick={()=>{
                document.location.href = `/order-${order._id}`;
            }}>Details</button>
        </div>
    )
}

export default OrderHistoryItem;