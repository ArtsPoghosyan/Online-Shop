const OrderModel = require("../models/OrderModel");
const fetch = require("node-fetch");

const { CLIENT_ID, APP_SECRET } = process.env;
const baseURL = {
    sandbox: "https://api-m.sandbox.paypal.com",
    production: "https://api-m.paypal.com"
};

class OrderController{
    static getOrders = async (userId, req, res, next)=>{
        try{
            const orders = await OrderModel.getOrders(userId);
            return res.json({orders, succesMessage: "request is succesful"});
        }catch(err){
            next(err);
        }
    }
    static getOrder = async (userId, req, res, next)=>{
        try{
            const {id} = req.params;
            const order = await OrderModel.getOrder(id);
            if(!order){
                return res.json({errorMessage: "Not Found Order"});
            }
            return res.json({order, succesMessage: "request is successful"});
        }catch(err){
            next(err);
        }
    }
    static addOrder = async (userId, req, res, next)=>{
        try{
            const {name, userId, city, totalPrice, payment, address, country, code, products, productsCount, productsPrice} = req.body;
            const order = await OrderModel.addOrder({name, userId, city, totalPrice, payment, address, country, code, products, productsCount, productsPrice});
            if(!order){
                return res.json({errorMessage: "an error occurred"});
            }
            return res.json({order, succesMessage: "request is successful"});
        }catch(err){
            next(err);
        }
    }
    static createPayPalOrder = async (userId, req, res, next)=>{
        try{
            const {product} = req.body;

            const order = await createOrder(product.cost);
            return res.json(order);
        }catch(err){
            console.log(err);
            next(err);
        }
    }
    static capturePayPalOrder = async (userId, req, res, next)=>{
        try{
            const { orderID, id } = req.body;
            const captureData = await capturePayment(orderID);

            if(captureData.status === "COMPLETED"){
                const order = await OrderModel.orderPaid(id, captureData.payer);
                return res.json({captureData, order, succesMessage: "payment order is succesful"});
            }

            return res.json({errorMessage: "payment don't succesfully"});
        }catch(err){
            next(err);
        }
    }

}


async function createOrder(totalPrice) {
    const accessToken = await generateAccessToken();
    const url = `${baseURL.sandbox}/v2/checkout/orders`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: totalPrice,
                }
            }
        ]
        })
    });

    const data = await response.json();
    return data;
}
  
async function capturePayment(orderId) {
    const accessToken = await generateAccessToken();
    const url = `${baseURL.sandbox}/v2/checkout/orders/${orderId}/capture`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        }
    });

    const data = await response.json();
    return data;
}
  
async function generateAccessToken() {
    const auth = Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64");

    const response = await fetch(`${baseURL.sandbox}/v1/oauth2/token`, {
        method: "POST",
        body: "grant_type=client_credentials",
        headers: {
            Authorization: `Basic ${auth}`,
        }
    });

    const data = await response.json();
    return data.access_token;
}

module.exports = OrderController;