const mongoose = require('mongoose');
const { Schema } = mongoose;

const societySchema = new Schema({
  name:{type:String,required:true,unique:true},
  address:{type:String},
  city:{type:String},
  state:{type:String},
  pincode:{type:Number},
  adminId:{type:mongoose.Schema.Types.ObjectId, ref:'Admin',required:true}
});

const Society = mongoose.model('Society',societySchema);
module.exports = Society;