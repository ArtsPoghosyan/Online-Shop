const TokenModel = require("../../models/TokenModel");
const bcrypt = require("bcrypt");

module.exports = async function authorizationAccept(req, res, next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        if(token !== "null"){
            const userToken = await TokenModel.getInfoByToken(token);
            if(userToken){
                return next(userToken.userId);
            }
        }

        return res.json({errorMessage: "user don't loggned"});
    }catch(err){
        return res.json({error: err});
    }
}