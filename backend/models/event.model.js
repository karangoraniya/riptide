const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EventSchema = new Schema({
  eventId: { type: String, required: true, unique: true },
});

module.exports=  mongoose.model('Event', EventSchema);