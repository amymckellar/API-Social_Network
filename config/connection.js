require("dotenv").config();

const { connect, connection } = require("mongoose");

const connectionURL =
  process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce";

connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
