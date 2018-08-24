'use strict'

let mongo = require('mongodb');
let client = mongo.MongoClient;
// underscore is a convention that says it's only used within this utility.
let _db;

module.exports = {
    // start creating connection with db
    connect() {
        // Param: URI for mongo: (protocol//server/location/database), the callback returns an error or a client.
        client.connect('mongodb://localhost:27017/hello-conference-dev', (err, client)  => {
            if(err) {
                console.log('Error connecting to Mongo - check mongod connection');
                // This will stop Node to prevent the app form running when no db is connected.
                process.exit(1);
            }
            _db = client.db('hello-conference-dev');
            console.log('Connected to Mongo');
        });
    },
    // Access events collection in order to run queries on that.
    events() {
        return _db.collection('events');
    }
};