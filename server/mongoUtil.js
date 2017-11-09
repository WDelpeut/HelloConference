"use strict"

let mongo = require('mongodb');
let client = mongo.MongoClient;
let _db;

// export as a module we can require in server.js
module.exports = {
    connect() {
        client.connect('mongodb://localhost:27017/hello-conference-dev', (err, db)  => {
            if(err) {
                console.log('Error connecting to Mongo - check mongod connection');
                process.exit(1);
            }
            _db = db;
            console.log('Connected to Mongo');
        });
    },
    // access events collection so that we can run some queries on that.
    events() {
        return _db.collection('events');
    }
};