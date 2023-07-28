import React from "react";
import "../../scss/style.scss";
function Loading(){
    return (
       <div className="divLoading">
            <div class="lds-ripple"><div></div><div></div></div>
       </div>
    )
}

export default Loading;