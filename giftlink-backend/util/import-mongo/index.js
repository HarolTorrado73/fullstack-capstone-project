require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

// MongoDB connection URL with authentication options
let url = `${process.env.MONGO_URL}`;
let filename = `${__dirname}/gifts.json`;
const dbName = 'giftdb';
const collectionName = 'gifts';

// notice you have to load the array of gifts into the data object
const data = JSON.parse(fs.readFileSync(filename, 'utf8')).docs;

// connect to database and insert data into the collection
async function loadData() {
    const client = new MongoClient(url);

    try {
        // Conectar al cliente
        await client.connect();
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // --- LÍNEA NUEVA: Borra lo que haya para evitar el "Gifts already exists" ---
        await collection.deleteMany({}); 

        // Insertar los datos directamente
        const insertResult = await collection.insertMany(data);
        console.log('Inserted documents:', insertResult.insertedCount);

    } catch (err) {
        console.error(err);
    } finally {
        // Close the connection
        await client.close();
    }
}

loadData();

module.exports = {
    loadData,
  };
