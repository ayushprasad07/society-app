const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').resolve(__dirname, './.env') });

const mongoURI = process.env.DATABASE_URL;


const connectToMongo = () => {
    mongoose.connect(mongoURI, {});
    console.log("Connected to mongo Successfully.");
}

module.exports = connectToMongo;
