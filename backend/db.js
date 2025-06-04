const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://ayushprasad2110:wumrWLDh5102fM4K@mongotute.xesle.mongodb.net/societyManagement?retryWrites=true&w=majority&appName=MongoTute'

const connectToMongo = ()=>{
    mongoose.connect(mongoURI,{});
    console.log("Connected to mango Successfully.");
}

module.exports = connectToMongo;