const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Players = require("../Models/playersModel.js");
const fs = require("fs");
dotenv.config({ path: "./config.env" });

const db_string = process.env.DATABASE.replace(
  "<password>",
  process.env.DB_PASS
);
mongoose.connect(db_string).then((con) => {
  console.log("succesfully connected to database");
});

const data = JSON.parse(fs.readFileSync(`${__dirname}/players_data.json`));
const importData = async () => {
  try {
    await Players.create(data);
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Players.deleteMany();
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
