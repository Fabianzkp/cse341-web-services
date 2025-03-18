const Contact = require("../models/User");
// const { userValidationRules, validate } = require('./validators');

// Get all contacts
const getAllUsers = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve contacts", error: err.message });
  }
};

// Get a single contact
const getSingle = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404).json({ message: "Contact not found" });
    } else {
      res.status(200).json(contact);
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve contact", error: err.message });
  }
};

// Create a new contact
const createUser = 
//   [userValidationRules(),
//   validate,
  async (req, res) => {
    const contact = new Contact({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    });

    try {
      const savedContact = await contact.save();
      res.status(201).json(savedContact);
    } catch (err) {
      res.status(500).json({ message: "Failed to create contact", error: err.message });
    }
  }
// ];

// Update a contact
const updateUser = 
//   [userValidationRules(),
//   validate,
  async (req, res) => {
    try {
      const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedContact) {
        res.status(404).json({ message: "Contact not found" });
      } else {
        res.status(200).json(updatedContact);
      }
    } catch (err) {
      res.status(500).json({ message: "Failed to update contact", error: err.message });
    }
  }
// ];

// Delete a contact
const deleteUser = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      res.status(404).json({ message: "Contact not found" });
    } else {
      res.status(200).json({ message: "Contact deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to delete contact", error: err.message });
  }
};

module.exports = {
  getAllUsers,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};