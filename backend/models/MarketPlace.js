const mongoose = require('mongoose');
const { Schema } = mongoose;

const marketPlaceSchema = new Schema({
  userId:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
  type:{type:String, required:true, enum:['buy','sell'], default:'buy'},
  title:{type:String, required:true},
  itemImage:{type:String},
  description:{type:String, required:true},
  price:{type:Number, required:true, default:0},
  venue:{type:String,required:true},
  createdAt:{type:Date, default:Date.now},
  isSold:{type:Boolean, default:false},
  phone:{type:String,required:true},
  approved:{type:Boolean, default:false},
  interestedUsers: [
    {
        user: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
        timestamp: Date
    }
  ],
  isHeld: { type: Boolean, default: false },
  inCart:{type:Boolean,default:false},
  society:{type:mongoose.Schema.Types.ObjectId, ref:"Society"}
});

const MarketPlace = mongoose.model('MarketPlace',marketPlaceSchema);
module.exports = MarketPlace;