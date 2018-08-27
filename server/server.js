'use strict';
let express = require('express');
let app = express();
let mongoUtil = require('./mongoUtil');

mongoUtil.connect();

/*
    This is mounting middleware in express: static (build in express core).
    Argument is the directory express will read files from and serve those static files.
    Express automatically looks for index.html as your root file.
    __dirname stands for current directory that we're on, our server (localhost).
*/
app.use(express.static(__dirname + '/../client'));

app.get('/events', (request, response) => {
    // static data in express application
    // response.json(["Frontend Developer Love 2019", "VueJS Amsterdam 2019"]);

    let events = mongoUtil.events();
    events.find().toArray((err, docs) => {
    //    console.log(JSON.stringify(docs));
       let eventNames = docs.map((event) => event.name);
       response.json(eventNames);
    });
});

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});