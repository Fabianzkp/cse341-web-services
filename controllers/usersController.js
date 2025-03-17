const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllUsers = async (req, res) => {
  const result = await mongodb.getDatabase().collection("contacts").find();
  result.toArray().then((contacts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  });
};

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

module.exports = {
  getAllUsers,
  getSingle,
};
