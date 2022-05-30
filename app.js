const express = require("express");
const playersRouter = require("./Routers/playersRouter.js");
const app = new express();

app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello from the custom middleware");
  next();
});
app.use("/api/v1/players", playersRouter);
module.exports = app;
