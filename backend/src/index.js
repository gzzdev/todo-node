const { MongoClient } = require("mongodb");
const express = require('express');
const app = express();

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME, NODE_PORT } = process.env;

const mongoURI =
  `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;


const client = new MongoClient(mongoURI);
let db = null;

app.use(express.json());
client.connect()
    .catch(console.error)
    .then(() => {    
        db = client.db(DB_NAME);
        app.listen(NODE_PORT, () => console.log(`Listening on port ${NODE_PORT}`));
    });


// const getCollections = async (req, res) => {
//     console.log("getCollections")
//     let colls = await client.db(DB_NAME).collection('devices').find().toArray();
//     res.send({'colls': colls});
// }


// app.get('/api/collections', getCollections)


const gracefulShutdown = () => {
    client.close().catch(() => {}).then(() => process.exit());
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon
// mongo -u learn -p secret -host localhost -port 27017 --authenticationDatabase admin