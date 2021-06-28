const dotenv = require("dotenv");
dotenv.config();
const mongodb = require("mongodb");

mongodb.connect(
  "mongodb://localhost:27017/surf-shop",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    module.exports = client;
    const app = require("./app");
    app.listen(3006, console.log("next create server"));
  }
);
