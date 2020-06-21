const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const lottery = mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  startTime: { type: Date, unique: true },
  endTime: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  ticketSold: { type: Array },
});

lottery.plugin(uniqueValidator);
module.exports = mongoose.model("lottery", lottery);
