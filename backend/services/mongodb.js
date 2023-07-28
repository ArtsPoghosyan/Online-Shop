const mongoose = require("mongoose");

const {MONGO_URL} = process.env;

async function start(){
    try{
        await mongoose.connect(MONGO_URL);
        console.log("Database Connected");
    }catch(err){
        console.error(err);
    }
}

start();

module.exports = mongoose;