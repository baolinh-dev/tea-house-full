const mongoose = require('mongoose');// ?
async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/tea_house");
    console.log("Connected to mongodb");
  } catch (error) {
    Promise.reject(error)
   // console.log("failed to connect to mongodb");
  }
}// I have no idea what i am doing. :>
module.exports = { connect };