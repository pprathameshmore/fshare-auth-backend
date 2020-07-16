module.exports = (app) => {
  const express = require("express");
  const passport = require("passport");
  const cors = require("cors");
  const session = require("express-session");
  const { config } = require("../configs/index");
  const errorHandler = require("../api/middlewares/errorHandler");
  const apiRouter = require("../api/routes/index");
  app.use(
    session({
      secret: "KeyboardKittens",
      resave: true,
      saveUninitialized: true,
    })
  );
  require("./logger")(app);
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cors({ origin: "http://localhost:3333/" }));
  //API Routes
  app.use(`/${config.API_PREFIX}`, apiRouter);
  app.use(errorHandler);
};
