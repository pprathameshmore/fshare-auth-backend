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
      secret: process.env.COOKIE_SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: {
        sameSite: "none",
      },
    })
  );
  require("./logger")(app);
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(passport.initialize());
  app.use(passport.session());
  const whitelist = [
    "https://fshare.netlify.app",
    "http://localhost:3001",
    "https://fshare-auth.azurewebsites.net",
  ];
  var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  };
  app.use(cors(corsOptions));
  //API Routes
  app.use(`/${config.API_PREFIX}`, apiRouter);
  app.use(errorHandler);
};
