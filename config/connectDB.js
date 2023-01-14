require("dotenv").config({ path: __dirname + "/config/.env" });
const mongoose = require("mongoose");

async function connectDb() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Db Connected!");
}

module.exports = { connectDb };
