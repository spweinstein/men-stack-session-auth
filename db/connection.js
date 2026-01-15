const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGODB_URI);
mongoose.set("returnOriginal", false); // So PUT requests return the new document, not old

mongoose.connection.on("disconnected", () => {
  console.log(
    `MongoDB ${mongoose.connection.name} connection has been disconnected`
  );
});

module.exports = mongoose.connection;
