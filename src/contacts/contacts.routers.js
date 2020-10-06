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

//PATCH
const changedContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});
contactsRouter.patch(
  "/:id",
  validate(changedContactSchema),
  ContactsController.changeContact
);

// DELETE
contactsRouter.delete("/:id", ContactsController.deleteContact);

module.exports = contactsRouter;
