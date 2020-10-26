const { Router } = require("express");
const { authorize } = require("../helpers/authorize");
const { errCatch } = require("../helpers/ErrCatch");
const { getCurrentUser } = require("./users.controllers");
const userRouter = Router();

userRouter.get("/current", authorize, errCatch(getCurrentUser));

module.exports = userRouter;
