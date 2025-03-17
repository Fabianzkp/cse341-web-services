const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

// Get all users
const getAllUsers = async (req, res) => {
  const result = await mongodb.getDatabase().collection("contacts").find();
  result.toArray().then((contacts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  });
};

// Get a single user
const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .collection("contacts")
    .findOne({ _id: userId });

  if (!result) {
    res.status(404).json({ message: "Contact not found" });
    return;
  }
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(result);
};

// Create a new user
const createUser = async (req, res) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .getDatabase()
    .collection("contacts")
    .insertOne(user);
  if (response.acknowledged) {
    res.status(201).json(response); // Use 201 status code for created resource
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while creating the user");
  }
};

// Update a user
const updateUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const updateFields = req.body; // Use the request body directly for the update
  // console.log("Request body:", req.body); // Log the request body

  try {
    // To check if the email already exists and belongs to a different user
    if (updateFields.email) {
      const existingUser = await mongodb
        .getDatabase()
        .collection("contacts")
        .findOne({ email: updateFields.email });

      if (existingUser && existingUser._id.toString() !== userId.toString()) {
        return res.status(400).json({ message: "Duplicate key error: email already exists" });
      }
    }

    const response = await mongodb
      .getDatabase()
      .collection("contacts")
      .updateOne({ _id: userId }, { $set: updateFields });
    console.log("Update response:", response); // Log the update response
    if (response.modifiedCount > 0) {
      res.status(200).json({ message: "User updated successfully" }); // Use 200 status code for successful update
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while updating the user");
    }
  } catch (err) {
    console.error("Error updating user:", err); // Log the error
    res.status(500).json({ message: "Some error occurred while updating the user", error: err.message });
  }
};


// Delete a user
const deleteUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .collection("contacts")
    .deleteOne({ _id: userId }); // Use deleteOne instead of remove
  if (response.deletedCount > 0) {
    res.status(200).json({ message: "User deleted successfully" }); // Use 200 status code for successful deletion
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while deleting the user");
  }
};

module.exports = {
  getAllUsers,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};