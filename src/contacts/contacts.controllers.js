const contacts = require("../../contacts");

exports.getContacts = async (req, res, next) => {
  res.status(200).send(await contacts.listContacts());
};

// module.exports = class ContactsController {
//  async static getContacts(req, res, next) {

//     const contacts =  await contacts.listContacts()
//     return res.send(contacts);
//     // return res.send(contacts.listContacts());
//   }
// }; Почему ругается на асинки
