const mongoose = require("mongoose");

const User = mongoose.model("user", {
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number },
});

module.exports = User;
