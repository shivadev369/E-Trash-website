const mongoose = require('mongoose');

const pickupRequestSchema = new mongoose.Schema({
  name: String,
  email: String,
  location: String,
  contact: String,
  eWasteType: String
});

module.exports = mongoose.model('pickupRequest', pickupRequestSchema);
