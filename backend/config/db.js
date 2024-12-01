const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
    });
    console.log('MongoDB connected')
};

module.exports = connectDB;