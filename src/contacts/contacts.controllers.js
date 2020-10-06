const contacts = require("../../contacts");
// const fs = require("fs");
// const path = require("path");

// const contactsPath = path.join(__dirname, "../../db/contacts.json");

exports.getContacts = async (req, res, next) => {
  res.status(200).send(await contacts.listContacts());
};

exports.getContactsById = async (req, res, next) => {
  const { id } = req.params;

  const contact = await contacts.getContactById(id);

  if (!contact) {
    return res.status(404).send("Contact not found");
  }

  return res.status(200).send(contact);
};

exports.addContacts = async (req, res, next) => {
  const newContact = await contacts.addContact(req.body);
  console.log("newContact", newContact);
  res.status(201).send(newContact);
};

exports.changeContact = async (req, res, next) => {
  const { id } = req.params;

  const contact = await contacts.getContactById(id);

  if (!contact) {
    return res.status(404).send("Contact not found");
  }

  const changedContact = await contacts.updateContact(id, req.body);

  return res.status(200).send(changedContact);
};

exports.deleteContact = async (req, res, next) => {
  const { id } = req.params;

  const contact = await contacts.getContactById(id);

  if (!contact) {
    return res.status(404).send("Contact not found");
  }
  const deletedContact = await contacts.removeContact(id);

  return res.status(204).send("Deleted Successifully");
};
// module.exports = class ContactsController {
//  async static getContacts(req, res, next) {

//     const contacts =  await contacts.listContacts()
//     return res.send(contacts);
//     // return res.send(contacts.listContacts());
//   }
// }; Почему ругается на асинки
