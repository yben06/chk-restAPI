require("dotenv").config({ path: __dirname + "/config/.env" });
const express = require("express");
const { connectDb } = require("./config/connectDB");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/users", require("./routes/user"));

connectDb()
  .then(() => {
    app.listen(port, (err) => {
      err
        ? console.error("Failed running Server", err)
        : console.log(`Server running on: http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed connected Db", err);
    process.exit(1);
  });
