const UserModel = require("../../models/UserModel");

module.exports = async function checkEmail(req, res, next){
    try{
        const {email} = req.body;
        const user = await UserModel.getUserByEmail(email);
        if(user){
            return res.json({errorMessage: 'already there is user by this email'});
        }
        next();
    }catch(err){
        return res.json({error: err});
    }
}