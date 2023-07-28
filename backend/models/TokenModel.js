const mongoose = require("../services/mongodb");

const TokenSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    }, 
    userToken: {
        type: String,
        required: true
    }
}, {timestamps: true});

const TokenM = mongoose.model("token", TokenSchema);

class TokenModel{
    static getInfoByUserId = async (userId) => await TokenM.findOne({userId});
    static getInfoByToken = async (userToken) => await TokenM.findOne({userToken});
    static addToken = async (data) => await TokenM.create(data);
    static removeToken = async(userId) => await TokenM.deleteOne({userId});
}

module.exports = TokenModel;