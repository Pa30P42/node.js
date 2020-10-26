const { Router } = require("express");
const router = Router();
const Joi = require("joi");
const { validate } = require("../helpers/validate");
const { errCatch } = require("../helpers/ErrCatch");
const AuthController = require("./auth.controllers");

const registerScheme = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

router.post(
  "/sign-up",
  validate(registerScheme),
  errCatch(AuthController.createNewUser)
);

router.post(
  "/sign-in",
  validate(registerScheme),
  errCatch(AuthController.loginUser)
);

module.exports = router;
