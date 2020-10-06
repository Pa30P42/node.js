const contacts = require("../../contacts");
const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "../../db/contacts.json");

exports.getContacts = async (req, res, next) => {
  res.status(200).send(await contacts.listContacts());
};

exports.addContacts = async (req, res, next) => {
  try {
    const contactsList = await listContacts();
    const id = uuidv4();
    const newContact = { id, name, email, phone };
    await fsPromise.writeFile(
      contactsPath,
      JSON.stringify([...contactsList, newContact])
    );
    res.status(200);
  } catch (err) {
    console.log(err);
  }
};

// module.exports = class ContactsController {
//  async static getContacts(req, res, next) {

//     const contacts =  await contacts.listContacts()
//     return res.send(contacts);
//     // return res.send(contacts.listContacts());
//   }
// }; Почему ругается на асинки
