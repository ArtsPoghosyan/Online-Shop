const mongoose = require("../services/mongodb");

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }, 
    totalPrice: {
        type: Number,
        required: true
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    payment: {
        type: String,
        required: true
    },
    paymentData: {
        type: Object,
        required: true,
        default: {}
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    productsCount: {
        type: Number,
        required: true
    },
    productsPrice: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const OrderM = mongoose.model("order", OrderSchema);

class OrderModel{
    static getOrders = async function(userId){
        return await OrderM.find({userId});
    }
    static getOrder = async function(id){
        return await OrderM.findById(id);
    }
    static addOrder = async function(data){
        return await OrderM.create(data);
    }
    static orderPaid = async function(id, paymentData){
        return await OrderM.findByIdAndUpdate(id, {isPaid: true, paymentData}, {new: true});
    }
}

module.exports = OrderModel;