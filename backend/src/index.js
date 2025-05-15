import express from "express";
import expressConfig from "./frameworks/express";
import routes from "./frameworks/webserver/routes";

const { MongoClient } = require("mongodb");

const app = express();
expressConfig(app);


const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME, NODE_PORT } = process.env;

const mongoURI =
  `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;


const client = new MongoClient(mongoURI);
let db = null;
client.connect()
    .catch(console.error)
    .then(() => {    
        db = client.db(DB_NAME);
        app.listen(NODE_PORT, () => console.log(`Listening on port ${NODE_PORT}`));
    });

routes(app, express);
const gracefulShutdown = () => {
    client.close().catch(() => {}).then(() => process.exit());
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon
// mongo -u learn -p secret -host localhost -port 27017 --authenticationDatabase admin