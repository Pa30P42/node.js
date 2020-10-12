const contacts = require("./contacts");

exports.getContacts = async (req, res, next) => {
  try {
    res.status(200).send(await contacts.listContacts());
  } catch (err) {
    next(err);
  }
};

exports.getContactsById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const contact = await contacts.getContactById(id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res.status(200).send(contact);
  } catch (err) {
    next(err);
  }
};

exports.addContacts = async (req, res, next) => {
  try {
    const newContact = await contacts.addContact(req.body);

    res.status(201).send(newContact);
  } catch (err) {
    next(err);
  }
};

exports.changeContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const contact = await contacts.getContactById(id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    const changedContact = await contacts.updateContact(id, req.body);

    return res.status(200).send(changedContact);
  } catch (err) {
    next(err);
  }
};

exports.deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const contact = await contacts.getContactById(id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    const deletedContact = await contacts.removeContact(id);

    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};
