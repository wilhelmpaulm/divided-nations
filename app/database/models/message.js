let mongoose = require("mongoose");

let messageSchema = new mongoose.Schema({
  name: String,
  message: String
});

module.exports = mongoose.model("Message", messageSchema);
