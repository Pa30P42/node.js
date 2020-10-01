// import { v4 as uuidv4 } from "uuid";npm
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
  }
}

async function addContact(name, email, phone) {
  try {
    const contactsList = await listContacts();
    const id = uuidv4();
    await fsPromise.writeFile(
      contactsPath,
      JSON.stringify([...contactsList], { id, name, email, phone })
    );
  } catch (err) {
    console.log(err);
  }
  // ...твой код, uuidv4
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
