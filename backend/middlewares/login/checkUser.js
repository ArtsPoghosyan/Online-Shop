const UserModel = require("../../models/UserModel");
const bcrypt = require("bcrypt");

module.exports = async function checkUser(req, res, next){
    try{
        const {email, password} = req.body;

        const user = await UserModel.getUserByEmail(email);
        if(!user || !bcrypt.compareSync(password, user.password)){
            return res.json({errorMessage: "not found email or password"});
        }
        next(user);
    }catch(err){
        return res.json({error: err});
    }
}