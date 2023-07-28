const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const TokenModel = require("../models/TokenModel");
const bcrypt = require("bcrypt");

const {JWT_SECRET} = process.env;

class UserController{
    static index = async (userId, req, res, next)=>{
        try{
            const user = await UserModel.getUserById(userId);

            if(user){
                return res.json({ user: {...JSON.parse(JSON.stringify(user)), password: null}, auth: true, succesMessage: "request is successful"});
            }
            return res.json({error: {message: "there is wrong user id in token"}});
        }catch(err){
            next(err);
        }
    }
    static login = async (user, req, res, next)=>{
        try{
            const token = jwt.sign({id: user._id}, JWT_SECRET); 
            await TokenModel.addToken({userId: user._id, userToken: token});
            
            return res.json({user: {...JSON.parse(JSON.stringify(user)), password: undefined}, succesMessage: "login is successful", token, auth: true});
        }catch(err){
            next(err);
        }
    }
    static register = async (req, res, next)=>{
        try{
            const {password, email, name} = req.body;
            await UserModel.createUser({name, email, password: bcrypt.hashSync(password, 8)});
            return res.json({succesMessage: "register is successful"});
        }catch(err){
            next(err);
        }
    }
    static logout = async (userId, req, res, next)=>{
        try{
            await TokenModel.removeToken(userId);
            return res.json({succesMessage: "logout is successful"});
        }catch(err){
            next(err);
        }
    }
    static update = async (userId, req, res, next)=>{
        try{
            const {name, email, password, id} = req.body
            if(userId === id){
                const user = await UserModel.updateUser(id, password ? {name, email, password: bcrypt.hashSync(password, 8)} : {name, email});
                return res.json({succesMessage: "update is successful", user: {...JSON.parse(JSON.stringify(user)), password: undefined}, auth: true});
            }
            return res.json({errorMessage: "you cann't update this user", auth: false});
        }catch(err){
            next(err);
        }
    }
}

module.exports = UserController;