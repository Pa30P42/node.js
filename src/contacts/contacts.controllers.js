const AppError = require("../helpers/errApp");
const contacts = require("./models");

exports.getContacts = async (req, res, next) => {
  res.status(200).send(await contacts.listContacts());
};

exports.getContactsById = async (req, res, next) => {
  const { id } = req.params;

  const contact = await contacts.getContactById(id);

  if (!contact) {
    return next(new AppError(`Contact not found`, 404));
    // return res.status(404).json({ message: "Contact not found" });
  }

  return res.status(200).send(contact);
};

exports.addContacts = async (req, res, next) => {
  const newContact = await contacts.addContact(req.body);

  res.status(201).send(newContact);
};

exports.changeContact = async (req, res, next) => {
  const { id } = req.params;

  const contact = await contacts.getContactById(id);

  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }

  const changedContact = await contacts.updateContact(id, req.body);

  return res.status(200).send(changedContact);
};

exports.deleteContact = async (req, res, next) => {
  const { id } = req.params;

  const contact = await contacts.getContactById(id);

  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  const deletedContact = await contacts.removeContact(id);

  return res.sendStatus(204);
};
