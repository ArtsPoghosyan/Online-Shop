import axios from "axios";

export function OrdersApiLoader(){
    return new Promise(async (resolve, reject)=>{
        const result = await axios.get('http://localhost:4000/order/get', {headers: {"Content-Type": "application/json", "Authorization" : "Bearer " + localStorage.getItem("token")}});
        const {error, errorMessage, succesMessage, orders} = result.data;
        if(error){
            return resolve({state: {orders: []}});
        }
        if(errorMessage){
            return resolve({state: {orders: [], errorMessage}});
        }
        if(succesMessage){
            return resolve({state: {orders}});
        }
        return resolve({state: {orders: []}});
    })
};
export function OneOrderApiLoader(idOrder){
    return new Promise(async (resolve, reject)=>{
        const result = await axios.get(`http://localhost:4000/order/get/${idOrder}`, {headers: {"Content-Type": "application/json", "Authorization" : "Bearer " + localStorage.getItem("token")}});
        const {error, errorMessage, succesMessage, order} = result.data;

        if(error){
            return resolve({state: {orders: {}}});
        }
        if(errorMessage){
            return resolve({state: {orders: {}, errorMessage}});
        }
        if(succesMessage){
            return resolve({state: {orders: order}});
        }
        return resolve({state: {orders: {}}});
    })
};
export function AddOrderApiLoader(data){
    return new Promise(async (resolve, reject)=>{
        const result = await axios.post(`http://localhost:4000/order/add`, data, {headers: {"Content-Type": "application/json", "Authorization" : "Bearer " + localStorage.getItem("token")}});
        const {error, errorMessage, succesMessage, order} = result.data;
        if(error){
            return resolve({state: {orders: {}}});
        }
        if(errorMessage){
            return resolve({state: {orders: {}, errorMessage}});
        }
        if(succesMessage){
            localStorage.removeItem("carts");
            document.location.href = `/order-${order._id}`;
            return;
        }
        return resolve({state: {orders: {}}});
    })
};
