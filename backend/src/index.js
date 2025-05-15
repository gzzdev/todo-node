import express from "express";
import mongoose from "mongoose";
import expressConfig from "./frameworks/webserver/express.js";
import serverConfig from "./frameworks/webserver/server.js";
import routes from "./frameworks/webserver/routes/index.js";
import mongoConnection from "./frameworks/database/mongoDB/connection.js"
const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME, NODE_PORT } = process.env;
const mongoURI = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

const config = {
    port: NODE_PORT || 3000,
    mongo: {
      uri: mongoURI,
    },
};

const app = express();

expressConfig(app);
serverConfig(app, mongoose, config).startServer();

mongoConnection(mongoose, config, {
    autoReconnect: true,
    reconnectInterval: 1000,
    connectTimeoutMS: 1000,
}).connectToMongo();

routes(app, express);
// mongo -u learn -p secret -host localhost -port 27017 --authenticationDatabase admin