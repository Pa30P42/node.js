const contacts = require("./contacts");
const UserModel = require("./models");
const mongoose = require("mongoose");

exports.getContacts = async (req, res, next) => {
  try {
    const listContacts = await UserModel.find();
    res.status(200).json(listContacts);
  } catch (err) {
    next(err);
  }
};

exports.getContactsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let contact = "";
    if (mongoose.Types.ObjectId.isValid(id)) {
      contact = await UserModel.findById(id);
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }

      return res.status(200).send(contact);
    }
    return res.status(404).send("invalid id");
  } catch (err) {
    next(err);
  }
};

exports.addContacts = async (req, res, next) => {
  try {
    const newContact = await UserModel.create(req.body);

    res.status(201).send(newContact);
  } catch (err) {
    next(err);
  }
};

exports.changeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    let contact = "";
    if (mongoose.Types.ObjectId.isValid(id)) {
      contact = await UserModel.findContactByIdAndUpdate(id, req.body);
      if (!contact) {
        return res
          .status(404)
          .json({ message: "impossible to change contact" });
      }

      return res.status(200).send(contact);
    }

    return res.status(404).send("wrong contact id");
  } catch (err) {
    next(err);
  }
};

exports.deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    let contact = "";
    if (mongoose.Types.ObjectId.isValid(id)) {
      contact = await UserModel.findByIdAndDelete(id);
      if (!contact) {
        return res.status(404).json({ message: "Cannot delete contact" });
      }
      return res.status(204).send();
    }
    return res.status(404).send("wrong contact id");
  } catch (err) {
    next(err);
  }
};
