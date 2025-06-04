const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name:{type:String,required:true},
  userImage:{type:String},
  email:{type:String, required:true},
  password:{type:String, required:true},
  gender:{type:String, required:true},
  isValid:{type:Boolean, default:false},
  society:{
    type:mongoose.Schema.Types.ObjectId, 
    ref:"Society"
  }
});

const User = mongoose.model('user',userSchema);
module.exports = User;