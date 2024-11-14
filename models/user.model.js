const mongoose = require("mongoose");
const connectToDb = require("../db/db");

connectToDb();
const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  threads: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Threads"
  }],
  communities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community"
  }],

}, { timestamps: true })

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
