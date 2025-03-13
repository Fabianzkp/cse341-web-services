const dotenv = require('dotenv').config();
const mongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
    if (database) {
        console.log('Database is already initialized');
        return callback(null, database);
    }
    mongoClient.connect(process.env.MONGODB_URL)
    .then((client) => {
        database = client.db ('cse341-project');
        console.log('Database initialized');
        callback(null, database);
    })
    .catch((err) => {
        callback(err);
    });
};

const getDatabase = () => {
    if (!database) {
        throw Error ('Database not initialized');
    }
    return database;
};

module.exports = {
    initDb,
    getDatabase
};