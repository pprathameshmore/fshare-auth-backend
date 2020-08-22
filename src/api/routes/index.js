const express = require("express");
const router = express.Router();
const authRouter = require("./modules/auth");
const userRouter = require("./modules/user");
const { isAuthenticated } = require("../middlewares/isAuth");

router.use("/v1/auth", authRouter);
router.use("/v1/users", isAuthenticated, userRouter);

module.exports = router;
