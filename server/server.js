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

app.get('/events/:eventName', (request, response) => {
    let eventName = request.params.eventName;
    console.log('Event name: ' + eventName);
    let event = {
    "name": "VueJS Amsterdam 2019",
    "date": [
        "2019-02-14",
        "2019-02-15"
    ],
    "address": {
        "country": "the Netherlands",
        "city": "Amsterdam",
        "postal-code": "1013AP",
        "streetAddress": "Danzigerkade 5"
    },
    "venue": "Theater Amsterdam",
    "URL": "https://www.vuejs.amsterdam/",
    "topics": [
        "vue"
    ],
    "speakers": [
        "Evan You",
        "Sara Vieira",
        "Filipa Lacerda",
        "Jen Looper"
    ]}
    response.json(event);
});

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});