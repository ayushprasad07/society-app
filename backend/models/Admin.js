const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
  name:{type:String,required:true},
  adminImage:{type:String},
  email:{type:String, required:true},
  password:{type:String, required:true},
  gender:{type:String, required:true},
  society:{
    type:mongoose.Schema.Types.ObjectId, 
    ref:"Society"
  }
});

const Admin = mongoose.model('Admin',adminSchema);
module.exports = Admin;