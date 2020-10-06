const express = require("express");
const ContactsController = require("./contacts.controllers");
const Joi = require("joi");
const { validate } = require("../helpers/validate");

const contactsRouter = express.Router();

// GET

contactsRouter.get("/", ContactsController.getContacts);
contactsRouter.get("/:id", ContactsController.getContactsById);

// POST

const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

contactsRouter.post(
  "/",
  validate(createUserSchema),
  ContactsController.addContacts
);

module.exports = contactsRouter;
