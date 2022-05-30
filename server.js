const app = require("./app.js");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");

//Creating Connection String
const db_string = process.env.DATABASE.replace(
  "<password>",
  process.env.DB_PASS
);
// Connecting to the DataBase
mongoose.connect(db_string).then((con) => {
  console.log("Connected to the database");
});

//Initiating the Node app
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
