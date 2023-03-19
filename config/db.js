const mongoose = require('mongoose');
const colors = require('colors');
const  connectDB = async ()=>{

    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`connect to mongodb`.bgMagenta.white);
    } catch (error) {
        console.log(`connection to mongodb error ${error}`.bgMagenta.white);
    }
};
module.exports = connectDB;