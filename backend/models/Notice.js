const mongoose = require('mongoose');
const { Schema } = mongoose;

const noticeSchema = new Schema({
  title:{type:String, required:true},
  content:{type:String, required:true},
  type:{
    type:String,
    enum:['maintenance', 'emergency', 'general'],
    default:'general'
  },
  createdAt:{type:Date, default:Date.now},
  society:{type:mongoose.Schema.Types.ObjectId, ref:"Society"}
});

const Notice = mongoose.model('Notice',noticeSchema);
module.exports = Notice;