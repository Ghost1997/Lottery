const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const buy = mongoose.Schema({
  email: { type: String, required: true },
  lotteryId: { type: String, required: true },
  tickets: { type: Array, required: true },
});

buy.plugin(uniqueValidator);
module.exports = mongoose.model("buy", buy);
