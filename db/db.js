const mongoose = require("mongoose");

let isConnected = false;

const connectToDb = async () => {
  if (isConnected) return console.log("already connected to Db");
  try {
    mongoose.set("strictQuery", true)
    await mongoose.connect("mongodb://localhost:27017/Threads");
    isConnected = true;
    console.log("connected to database");
  } catch (error) {
    console.log("some error occured " + error)
  }
}


module.exports = connectToDb
