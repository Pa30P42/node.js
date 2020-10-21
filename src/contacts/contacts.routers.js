const express = require("express");
const ContactsController = require("./contacts.controllers");
const Joi = require("joi");
const { validate } = require("../helpers/validate");
const { errCatch } = require("../helpers/ErrCatch");

const contactsRouter = express.Router();

// GET

contactsRouter.get("/", errCatch(ContactsController.getContacts));
contactsRouter.get("/:id", errCatch(ContactsController.getContactsById));

// POST

const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

contactsRouter.post(
  "/",
  validate(createUserSchema),
  errCatch(ContactsController.addContacts)
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
  errCatch(ContactsController.changeContact)
);

// DELETE
contactsRouter.delete("/:id", errCatch(ContactsController.deleteContact));

module.exports = contactsRouter;
