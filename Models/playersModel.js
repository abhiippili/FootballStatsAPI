const mongoose = require("mongoose");

const playersSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, "A player must have a name"],
    unique: true,
    trim: true
  },
  Position: {
    type: String,
    required: [true, "A player must have a playing position"],
    uppercase: true,
    trim: true
  },
  Nationality: {
    type: String,
    required: [true, "A player must be of some nation"],
    uppercase: true,
    trim: true
  },
  DateOfBirth: {
    type: String,
    required: true
  },
  Club: {
    type: String,
    required: [true, "A player must be a part of a club"],
    trim: true
  },
  Leagues: {
    type: [String],
    required: [true, "A player must be a part of a league"],
    trim: true
  },
  Appearances: {
    type: Number,
    required: [true, "A player must have atleast one appearance"]
  },
  GoalsScored: {
    type: Number
  },
  CleanSheets: {
    type: Number
  },
  GoalsConceded: {
    type: Number
  },
  Assists: {
    type: Number
  },
  Tackles: {
    type: Number
  },
  Fouls: {
    type: Number,
    default: 0
  },
  FifaRating: {
    type: Number,
    required: [true, "A player should be recognised atleast by FIFA :)"]
  },
  TransferMarketValue: {
    type: Number
  },
  Awards: {
    type: String,
    trim: true
  },
  CreatedAt: {
    type: Date,
    default: Date.now(),
    format: "YYYY-MM-DD",
    select: false
  }
});

const Players = mongoose.model("Players", playersSchema);
module.exports = Players;
