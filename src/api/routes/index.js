const express = require("express");
const router = express.Router();
const authRouter = require("./modules/auth");

router.use("/v1/auth", authRouter);

module.exports = router;
