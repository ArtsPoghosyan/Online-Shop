import React from "react";
import queryString from "query-string";

function SearchComp(){
    return (
        <div>
            <h3>Categories</h3>
            <a onClick={(evt)=>serachHandle("category", "pants")}>Pants</a>
            <a onClick={(evt)=>serachHandle("category", "shirt")}>Shirts</a>
            <a onClick={(evt)=>serachHandle("category", "botas")}>Botas</a>
        </div>
    )
}

function serachHandle(type, search){
    const parsed = queryString.parse(document.location.search);
    let query = document.location.search || "?";
    if(parsed[type]){
        let href = query.replace((type + "=" + parsed[type]), type + "=" + search);
        document.location.search = href;
        return;
    }
    document.location.href = "/search" + query + `&${type}=${search}`;
}

export default SearchComp;