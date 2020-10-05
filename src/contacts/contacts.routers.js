const express = require("express");
const ContactsController = require("./contacts.controllers");

const contactsRouter = express.Router();

contactsRouter.get("/", ContactsController.getContacts);

module.exports = contactsRouter;
