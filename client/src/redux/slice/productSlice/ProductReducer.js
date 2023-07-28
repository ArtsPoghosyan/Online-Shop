import { AddProductApiLoader, AddReviewInProductApiLoader, DeleteProductApiLoader, GetSearchProductsApiLoader, OneProductsApiLoader, ProductsApiLoader, UpdateProductApiLoader, UpdateProductwithPhotoApiLoader } from "./ProductApi";

export function products(state={}, action){
    if(action.type === "setProducts"){
        return {
            ...action.payload.state
        };
    }
    return state;
}

export const initalProducts = {
    products: false
};

function setProducts(state){
    return {
        type: "setProducts",
        payload: {state}
    }
}

export function GetProductsApi(){
    return (dispatch, getState)=>{
        return ProductsApiLoader().then((res)=>{
            dispatch(setProducts(res.state));
        })
    }
}
export function GetOneProductApi(id){
    return (dispatch, getState)=>{
        return OneProductsApiLoader(id).then((res)=>{
            dispatch(setProducts(res.state));
        })
    }
}

export function AddReviewInProduct(id, review){
    return (dispatch, getState)=>{
        return AddReviewInProductApiLoader(id, review).then((res)=>{
            dispatch(setProducts(res.state));
        })
    }
}
export function GetSearchProductsApi(query){
    return (dispatch, getState)=>{
        return GetSearchProductsApiLoader(query).then((res)=>{
            dispatch(setProducts(res.state));
        })
    }
}
export function AddProductApi(data){
    return (dispatch, getState)=>{
        return AddProductApiLoader(data).then((res)=>{
            dispatch(setProducts(res.state));
        })
    }
}
export function DeleteProductApi(data){
    return (dispatch, getState)=>{
        return DeleteProductApiLoader(data).then((res)=>{
            dispatch(setProducts(res.state));
        })
    }
}
export function UpdateProductApi(data){
    return (dispatch, getState)=>{
        return UpdateProductApiLoader(data).then((res)=>{
            dispatch(setProducts(res.state));
        })
    }
}
export function UpdateProducwithPhotoApi(id,data){
    return (dispatch, getState)=>{
        return UpdateProductwithPhotoApiLoader(id, data).then((res)=>{
            dispatch(setProducts(res.state));
        })
    }
}