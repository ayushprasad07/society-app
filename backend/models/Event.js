const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
  title:{type:String, required:true},
  eventImage:{type:String},
  content:{type:String, required:true},
  eventDate:{type:Date,required:true},
  venue:{type:String,required:true},
  organizedBy:{type:String,required:true},
  createdAt:{type:Date, default:Date.now},
  society:{type:mongoose.Schema.Types.ObjectId, ref:"Society"}
});

const Event = mongoose.model('Event',eventSchema);
module.exports = Event;