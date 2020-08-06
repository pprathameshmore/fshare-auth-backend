const express = require("express");
const passport = require("../../../configs/passport");
const {
  callbackAuth,
  signout,
  sendAccessToken,
} = require("../../controllers/auth");
const { addSocketIdToSession } = require("../../middlewares/socket-id");
const auth = express.Router();

auth.route("/token").post(sendAccessToken);

auth.route("/failed").get((req, res, next) => {
  res.send("Something went wrong");
});

auth.route("/signout").delete(signout);

auth
  .route("/google")
  .get(
    addSocketIdToSession,
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
auth
  .route("/google/callback")
  .get(
    passport.authenticate("google", { failureRedirect: "/api/v1/auth/failed" }),
    callbackAuth
  );

module.exports = auth;
