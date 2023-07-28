import React from "react";
import "../../scss/style.scss";

function Review({revie}){
    return (
        <div className="review">
            <h3>{revie.userName}</h3>
            <img className="ratingImg" src={revie.rateImg}/>
            <h4>{revie.dataCreated}</h4>
            <p>{revie.description}</p>
        </div>
    )
}

export default Review;