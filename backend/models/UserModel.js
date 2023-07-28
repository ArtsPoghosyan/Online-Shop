const mongoose = require("../services/mongodb");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean, 
        default: false
    },
    forgotPassKey: {
        type: String
    }
}, {timestamps: true});

const UserM = mongoose.model("user", UserSchema);

class UserModel{
    static getUserByEmail = async (email) => await UserM.findOne({email});
    static getUserById = async (id) => await UserM.findById(id);
    static createUser = async (state) => await UserM.create({...state});
    static updateUser = async (id, state) => await UserM.findByIdAndUpdate(id, {...state}, {new: true});
}

module.exports = UserModel;