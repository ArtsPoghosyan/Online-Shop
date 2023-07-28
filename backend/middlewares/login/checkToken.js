const jwt = require("jsonwebtoken");
const TokenModel = require("../../models/TokenModel");
const bcrypt = require("bcrypt");

module.exports = async function checkToken(user, req, res, next){
    try{
        const tokenVerify = await TokenModel.getInfoByUserId(user._id);
        if(tokenVerify){
            await TokenModel.removeToken(user._id); 
        }
        next(user);
    }catch(err){
        return res.json({error: err});
    }
}