const TokenModel = require("../../models/TokenModel");
const bcrypt = require("bcrypt");

module.exports = async function authorizationIgnore(req, res, next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        if(token !== "null"){
            const userToken = await TokenModel.getInfoByToken(token);
            if(userToken){
                return res.json({errorMessage: "authorization user don't be this router"});
            }
        }
        next();
    }catch(err){
        return res.json({error: err});
    }
}