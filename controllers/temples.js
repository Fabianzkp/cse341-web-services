const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const apiKey = 'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N';

exports.create = async (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  const temple = {
    temple_id: req.body.temple_id,
    name: req.body.name,
    description: req.body.description,
    location: req.body.location,
  };

  try {
    const db = mongodb.getDatabase();
    const result = await db.collection('temples').insertOne(temple);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Some error occurred while creating the Temple.', error: err.message });
  }
};

exports.findAll = async (req, res) => {
  console.log(req.header('apiKey'));
  if (req.header('apiKey') === apiKey) {
    try {
      const db = mongodb.getDatabase();
      const temples = await db.collection('temples').find({}).toArray();
      res.status(200).json(temples);
    } catch (err) {
      res.status(500).json({ message: 'Some error occurred while retrieving temples.', error: err.message });
    }
  } else {
    res.status(403).json({ message: 'Invalid apiKey, please read the documentation.' });
  }
};

exports.findOne = async (req, res) => {
  const temple_id = parseInt(req.params.temple_id, 10); // Convert to number
  console.log(`Searching for temple with id: ${temple_id}`); // Log the temple_id
  if (req.header('apiKey') === apiKey) {
    try {
      const db = mongodb.getDatabase();
      const temple = await db.collection('temples').findOne({ temple_id: temple_id });
      // console.log(`Query result: ${JSON.stringify(temple)}`); // Log the query result
      if (!temple) {
        res.status(404).json({ message: 'Not found Temple with id ' + temple_id });
      } else {
        res.status(200).json(temple);
      }
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving Temple with temple_id=' + temple_id, error: err.message });
    }
  } else {
    res.status(403).json({ message: 'Invalid apiKey, please read the documentation.' });
  }
};

exports.update = async (req, res) => {
  const templeId = parseInt(req.params.temple_id, 10); // Convert to number
  console.log(`Updating temple with id: ${templeId}`); // Log the temple_id
  try {
    const db = mongodb.getDatabase();
    const result = await db.collection('temples').updateOne(
      { temple_id: templeId },
      { $set: req.body }
    );
    // console.log(`Update result: ${JSON.stringify(result)}`); // Log the update result

    if (result.matchedCount === 0) {
      res.status(404).json({ message: 'Temple not found' });
    } else {
      res.status(200).json({ message: 'Temple updated successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating temple', error: error.message });
  }
};

exports.delete = async (req, res) => {
  const templeId = parseInt(req.params.temple_id, 10); // Convert to number
  // console.log(`Deleting temple with id: ${templeId}`); // Log the temple_id
  try {
    const db = mongodb.getDatabase();
    const result = await db.collection('temples').deleteOne({ temple_id: templeId });
    console.log(`Delete result: ${JSON.stringify(result)}`); // Log the delete result

    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Temple not found' });
    } else {
      res.status(200).json({ message: 'Temple successfully deleted' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// // Update a Temple by the id in the request
// exports.update = (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: 'Data to update can not be empty!',
//     });
//   }

//   const id = req.params.id;

//   Temple.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//     .then((data) => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot update Temple with id=${id}. Maybe Temple was not found!`,
//         });
//       } else res.send({ message: 'Temple was updated successfully.' });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: 'Error updating Temple with id=' + id,
//       });
//     });
// };

// // Delete a Temple with the specified id in the request
// exports.delete = (req, res) => {
//   const id = req.params.id;

//   Temple.findByIdAndRemove(id)
//     .then((data) => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot delete Temple with id=${id}. Maybe Temple was not found!`,
//         });
//       } else {
//         res.send({
//           message: 'Temple was deleted successfully!',
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: 'Could not delete Temple with id=' + id,
//       });
//     });
// };

// // Delete all Temples from the database.
// exports.deleteAll = (req, res) => {
//   Temple.deleteMany({})
//     .then((data) => {
//       res.send({
//         message: `${data.deletedCount} Temples were deleted successfully!`,
//       });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || 'Some error occurred while removing all temple.',
//       });
//     });
// };

// // Find all published Temples
// exports.findAllPublished = (req, res) => {
//   Temple.find({ published: true })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || 'Some error occurred while retrieving temple.',
//       });
//     });
// };
