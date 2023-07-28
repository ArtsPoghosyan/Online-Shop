const UserModel = require("../../models/UserModel");

module.exports = async function isAdmin(userId, req, res, next){
    try{
        const user = await UserModel.getUserById(userId);
        if(user){
            if(user.isAdmin){
                return next(userId);
            }
            return res.json({error: {message: "user don't admin"}});
        }
        return res.json({errorMessage: "Not Found User"});
    }catch(err){
        return res.json({error: err});
    }
}