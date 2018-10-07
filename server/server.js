'use strict';
let express = require('express');
let app = express();
let mongoUtil = require('./mongoUtil');
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();

mongoUtil.connect();

/*
    This is mounting middleware in express: static (build in express core).
    Argument is the directory express will read files from and serve those static files.
    Express automatically looks for index.html as your root file.
    __dirname stands for current directory that we're on, our server (localhost).
*/
app.use(express.static(__dirname + '/../client'));

app.get('/events', (request, response) => {
  let events = mongoUtil.events();
  events.find().toArray((err, docs) => {
    // console.log(JSON.stringify(docs));
    if(err) {
      response.sendStatus(400);
    }
    let eventNames = [];
    for(let i = 0; i < docs.length; i++) {
      for(let j = 0; j < docs[i].events.length; j++) {
        eventNames.push(docs[i].events[j].name);
      }
    }
    response.json(eventNames);
  });
});

// We add jsonParser as middleware. This middelware will be run before the handler has run.
app.post('/events', jsonParser, (request, response) => {
  let newEvent =  request.body;
  let events = mongoUtil.events();

  events.insertOne(newEvent);

  response.sendStatus(201); 
});


app.get('/events/:eventName', (request, response) => {
  let eventName = request.params.eventName;
  let events = mongoUtil.events();
  events.find({name: eventName}).limit(1).next((err, doc) => {
    if(err) {
      response.sendStatus(400);
    }
    response.json(doc);
  })
});


app.listen(3000, () => {
  console.log('Listening on port 3000...');
});