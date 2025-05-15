export default function serverConfig(app, mongoose, config) {
  function startServer() {
    app.listen(config.port, () => {
        console.log(`Server is running on port ${config.port}`);
    });
    // let db = null;
    // client.connect()
    //     .catch(console.error)
    //     .then(() => {
    //         db = client.db(DB_NAME);
    //         app.listen(NODE_PORT, () => console.log(`Listening on port ${NODE_PORT}`));
    //     });
    // routes(app, express);
    // process.on('SIGINT', gracefulShutdown);
    // process.on('SIGTERM', gracefulShutdown);
    // process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon
  }

  return {
    startServer,
  };
}