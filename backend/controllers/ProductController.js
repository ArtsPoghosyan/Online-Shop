const jwt = require("jsonwebtoken");
const ProductModel = require("../models/ProductModel");
const fs = require("fs");
const path = require("path");

class ProductController{
    static getProducts = async (req, res, next)=>{
        try{
            const products = await ProductModel.getProducts();
            return res.json({products, succesMessage: "request is successful"});
        }catch(err){
            next(err);
        }
    }
    static getOneProduct = async (req, res, next)=>{
        try{
            const {id} = req.params;
            if(!id){
                return res.json({error: {message: "product id doesn't pass"}});
            }
            const product = await ProductModel.getProduct(id);
            if(!product){
                return res.json({errorMessage: "Not Found Product"});
            }
            return res.json({product, succesMessage: "request is successful"});
        }catch(err){
            next(err);
        }
    }
    static addProduct = async (userId, req, res, next)=>{
        try{
            const {name, price, description, category} = req.body;
            const {originalname, buffer} = req.file;

            const fileName = Date.now() + "-" + originalname;
            const filePath = path.join(__dirname, "../images/product/") + fileName;

            fs.writeFileSync(filePath, buffer);
            await ProductModel.addProduct({name, price, description, category, productImg: "./product/" + fileName});
           
            const products = await ProductModel.getProducts();
            if(!products){
                return res.json({errorMessage: "Not Found Products"});
            }
            return res.json({products, succesMessage: "add product is successful"});
        }catch(err){
            next(err);
        }
    }
    static deleteProduct = async (userId, req, res, next)=>{
        try{
            const {id, productImg} = req.body;

            await ProductModel.deleteProduct(id);
            fs.unlinkSync(path.join(__dirname, "../images", productImg));
        
            const products = await ProductModel.getProducts();
            if(!products){
                return res.json({errorMessage: "Not Found Products"});
            }
            return res.json({products, succesMessage: "delete product is successful"});
        }catch(err){
            next(err);
        }
    }
    static updateProduct = async (userId, req, res, next)=>{
        try{
            const {id, name, price, description, category} = req.body;
                console.log(req.body);
            const product = await ProductModel.updateProduct(id, {name, price, description, category});
            if(!product){
                return res.json({errorMessage: "Not Found Product"});
            }
            return res.json({product, succesMessage: "update product is successful"});
        }catch(err){
            next(err);
        }
    }
    static updateProductPhoto = async (userId, req, res, next)=>{
        try{
            const {id, name, price, description, category, oldImg} = req.body;
            const {originalname, buffer} = req.file;
            console.log("file", req.file);
            const fileName = Date.now() + "-" + originalname;
            const oldFilePath = path.join(__dirname, "../images/", oldImg);
            console.log(oldFilePath);
            const newFilePath = path.join(__dirname, "../images/product/") + fileName;
            console.log(newFilePath);
            fs.unlinkSync(oldFilePath);
            fs.writeFileSync(newFilePath, buffer);
            const product = await ProductModel.updateProduct(id, {name, price, description, category, productImg: "./product/" + fileName});

            if(!product){
                return res.json({errorMessage: "Not Found Product"});
            }
            return res.json({product, succesMessage: "update product is successful"});
        }catch(err){
            next(err);
        }
    }
    static addReviewInProduct = async (userId, req, res, next)=>{
        try{
            const {id, review} = req.body;
            if(!id || !review){
                return res.json({error: {message: "product id or review don't pass"}});
            }
            const prod = await ProductModel.getProduct(id);
            if(!prod){
                return res.json({errorMessage: "not found product"});
            }
            let rates = 0;
            for(let rev of prod.reviews){
                if(rev.userId === review.userId){
                    return res.json({product: prod, errorMessage: "user already is added review"});
                }
                rates += rev.rate;
            }
            rates += review.rate;

            function getRatingImg (rates, countRates){
                const x = rates / countRates;
                const numImg = Math.floor(x) + (x % 1 >= 0.5 ? 0.5 : 0);
                return "./rating/stars-" + numImg + ".png";
            }

            await ProductModel.addReviewInProduct(id, review, getRatingImg(rates, prod.reviews.length + 1), (rates / (prod.reviews.length + 1)));
            const product = await ProductModel.getProduct(id);
            if(!product){
                return res.json({errorMessage: "not found product"});
            }
            return res.json({product, succesMessage: "add review is successful"});
        }catch(err){
            next(err);
        }
    }
    static productSearch = async (req, res, next)=>{
        try{
            const {name, price, category, rating, sort} = req.query;
            
            const products = await ProductModel.queryProduct({name, price, category, rating, sort});
            
            return res.json({products, succesMessage: "request is successful"});
        }catch(err){
            next(err);
        }
    }
}

module.exports = ProductController;