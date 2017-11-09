"use strict"

let mongo = require('mongodb');
let client = mongo.MongoClient;
let _db;

// export as a module we can require in server.js
module.exports = {
    // start connection with db
    connect() {
        // Param: URI for mongo: (protocol//server/location/database), the callback returns an error or a database instance.
        client.connect('mongodb://localhost:27017/hello-conference-dev', (err, db)  => {
            if(err) {
                console.log('Error connecting to Mongo - check mongod connection');
                // This will stop Node to prvent the app form running when no db is connected.
                process.exit(1);
            }
            _db = db;
            console.log('Connected to Mongo');
        });
    },
    // Access events collection in order to run queries on that.
    events() {
        return _db.collection('events');
    }
};