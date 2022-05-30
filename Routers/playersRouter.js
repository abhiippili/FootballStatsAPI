const express = require("express");
const router = express.Router();
const playersController = require("./../Controllers/playersController.js");

router.route("/gte85-players-stats").get(playersController.getPlayersStats);
router
  .route("/top-three-valuable-players")
  .get(playersController.topPlayers, playersController.getAllPlayers);

router
  .route("/")
  .get(playersController.getAllPlayers, playersController.topPlayers)
  .post(playersController.createPlayer);
router
  .route("/:id")
  .get(playersController.getPlayer)
  .patch(playersController.updatePlayer)
  .delete(playersController.deletePlayer);

module.exports = router;
