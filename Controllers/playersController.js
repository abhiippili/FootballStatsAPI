const { Query } = require("mongoose");
const Players = require("./../Models/playersModel.js");
const APIFeatures = require("./../utils/apiFeatures.js");

exports.topPlayers = (req, res, next) => {
  req.query.limit = "3";
  req.query.fields = "FifaRating,TransferMarketValue,Name,Position,Club";
  req.query.sort = "-FifaRating,TransferMarketValue";
  next();
};

exports.getPlayersStats = async (req, res) => {
  try {
    const stats = await Players.aggregate([
      {
        $match: { Appearances: { $gte: 25 } }
      },
      {
        $group: {
          _id: "$FifaRating",
          noOfPlayers: { $sum: 1 },
          GoalsAverage: { $avg: "$GoalsScored" },
          AssistsAverage: { $avg: "$Assists" }
          // LeaguesPlayedOnAverage : {$avg : {$sum : "$Leagues"}}
        }
      }
    ]);
    res.status(200).json({
      status: "success",
      data: {
        stats
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};
exports.createPlayer = async (req, res) => {
  try {
    // console.log(req.body);
    const newPlayer = await Players.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newPlayer
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};
exports.getAllPlayers = async (req, res) => {
  try {
    // Execute Query
    let features = new APIFeatures(Players.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const players = await features.query;
    res.status(200).json({
      status: "success",
      data: {
        players
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};
exports.getPlayer = async (req, res) => {
  try {
    const player = await Players.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        player
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};
exports.updatePlayer = async (req, res) => {
  try {
    const player = await Players.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.status(200).json({
      status: "success",
      data: {
        player
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};
exports.deletePlayer = async (req, res) => {
  try {
    await Players.findByIdAndDelete(req.params.id, req.body);
    // console.log("deltails of deletion : ", playerDeleted);
    res.status(200).json({
      status: "success",
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};
