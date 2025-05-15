export default function connection(mongoose, config, options) {
    function connectToMongo() {
        mongoose.connect(config.mongo.uri)
            .then(
                () => {},
                (err) => {
                    console.log('MongoDB connection error: ', err);
                }
            )
            .catch((err) => {
                console.log('Error: ', err);
            });
    }

    mongoose.connection.on('connected', () => {
        console.log('MongoDB connected');
    });

    mongoose.connection.on('reconnected', () => {
        console.log("MongoDB reconnected");
    });


    mongoose.connection.on('error', (err) => {
        console.log('MongoDB connection error: ', err);
        mongoose.disconnect();
    });

    mongoose.connection.on('disconnected', () => {
        console.log(`MongoDB disconnected Reconnecting in ${options.reconnectInterval}ms`); 
        setTimeout(() => connectToMongo, options.reconnectInterval);
    });

    return {
        connectToMongo,
    }
}