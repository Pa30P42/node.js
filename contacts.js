const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const { promises: fsPromise } = fs;

async function listContacts() {
  return JSON.parse(await fsPromise.readFile(contactsPath, "utf-8"));
}

async function getContactById(contactId) {
  try {
    const contactsList = await listContacts();
    return contactsList.find((contact) => contact.id === contactId);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

async function removeContact(contactId) {
  try {
    const contactsList = await listContacts();
    const filteredList = contactsList.filter(
      (contact) => contact.id !== contactId
    );
    await fsPromise.writeFile(contactsPath, JSON.stringify(filteredList));
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

async function addContact(name, email, phone) {
  try {
    const contactsList = await listContacts();
    const id = uuidv4();
    const newContact = { id, name, email, phone };
    await fsPromise.writeFile(
      contactsPath,
      JSON.stringify([...contactsList, newContact])
    );
    console.log(newContact);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  // ...твой код, uuidv4
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
