const mongoose = require('mongoose');


const connectDB = async (req, res)=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Database connection failed: ' + error.message);
    }
}

module.exports = connectDB;