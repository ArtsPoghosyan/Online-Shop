const mongoose = require("../services/mongodb");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }, 
    category: {
        type: String,
        required: true
    },
    productImg: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    }, 
    ratingImg: {
        type: String,
        default: "./rating/stars-0.png"
    }, 
    reviews: {
        type: Array,
        default: []
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

const ProductM = mongoose.model("product", ProductSchema);

class ProductModel{
    static getProducts = async function(){
        return await ProductM.find({});
    }
    static getProduct = async function(id){
        return await ProductM.findById(id);
    }
    static addProduct = async function(data){
        return await ProductM.create(data);
    }
    static deleteProduct = async function(id){
        return await ProductM.findByIdAndDelete(id);
    }
    static updateProduct = async function(id, data){
        return await ProductM.findByIdAndUpdate(id, data, {new: true});
    }
    static addReviewInProduct = async function(id, review, ratingImg, rating){
        return await ProductM.findByIdAndUpdate(id, {ratingImg, rating, $push: {reviews: review}});
    }
    static queryProduct = async function({name, price, category, rating, sort}){
        const ratingOption = rating === "all" || !rating ? 0 : +rating;
        console.log(ratingOption);
        const priceOption = price === "all" || !price ? [0, Infinity] : price.split("-");
        const nameOption = !name || name === "all" ? undefined : name;
        const categoryOption = !category || category === "all" ? undefined : category;

        if(nameOption && categoryOption){
            return await ProductM.find({name: {$regex : new RegExp(`\\b${name}\\b`, 'gi')}, category, price: {$gte: priceOption[0], $lte: priceOption[1]}, rating: {$gte: ratingOption, $lte: 5}}).sort(!sort ? {} : sort === "newest" ? {createdAt: "desc"} : sort === "lowest" ? {price: "asc"} : sort === "highest" ? {price: "desc"} : sort === "top" ? {rating : "desc"} : {});
        }
        if(nameOption){
            return await ProductM.find({name: {$regex : new RegExp(`\\b${name}\\b`, 'gi')}, price: {$gte: priceOption[0], $lte: priceOption[1]}, rating: {$gte: ratingOption, $lte: 5}}).sort(!sort ? {} : sort === "newest" ? {createdAt: "desc"} : sort === "lowest" ? {price: "asc"} : sort === "highest" ? {price: "desc"} : sort === "top" ? {rating : "desc"} : {});
        }
        if(categoryOption){
            return await ProductM.find({category, price: {$gte: priceOption[0], $lte: priceOption[1]}, rating: {$gte: ratingOption, $lte: 5}}).sort(!sort ? {} : sort === "newest" ? {createdAt: "desc"} : sort === "lowest" ? {price: "asc"} : sort === "highest" ? {price: "desc"} : sort === "top" ? {rating : "desc"} : {});
        }
        return await ProductM.find({price: {$gte: priceOption[0], $lte: priceOption[1]}, rating: {$gte: ratingOption, $lte: 5}}).sort(!sort ? {} : sort === "newest" ? {createdAt: "desc"} : sort === "lowest" ? {price: "asc"} : sort === "highest" ? {price: "desc"} : sort === "top" ? {rating : "desc"} : {});
    }
}

module.exports = ProductModel;