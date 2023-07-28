import { AddOrderApiLoader, OneOrderApiLoader, OrdersApiLoader } from "./OrderApi";

export function orders(state={}, action){
    if(action.type === "setOrders"){
        return {
            ...action.payload.state
        };
    }
    return state;
}

export const initalOrders = {
    orders: false
};

export function setOrders(state){
    return {
        type: "setOrders",
        payload: {state}
    }
}

export function GetOrdersApi(){
    return (dispatch, getState)=>{
        return OrdersApiLoader().then((res)=>{
            dispatch(setOrders(res.state));
        })
    }
}
export function GetOneOrderApi(id){
    return (dispatch, getState)=>{
        return OneOrderApiLoader(id).then((res)=>{
            dispatch(setOrders(res.state));
        })
    }
}
export function AddOrderApi(data){
    return (dispatch, getState)=>{
        return AddOrderApiLoader(data).then((res)=>{
            dispatch(setOrders(res.state));
        })
    }
}
