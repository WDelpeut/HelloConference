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

app.get('/categories', (request, response) => {
  let events = mongoUtil.events();
  events.find().toArray((err, docs) => {
    if(err) {
      response.sendStatus(400);
    }
    let categories = [];
    for(let i = 0; i < docs.length; i++) {
      categories.push(docs[i].category);
    }
    response.json(categories);
  })
})

app.get('/categories/:categoryName', (request, response) => {
  let categoryName = request.params.categoryName;
  let events = mongoUtil.events();
  events.find({category: categoryName}).limit(1).next((err, doc) => {
    if(err) {
      response.sendStatus(400);
    }
    response.json(doc);
  })
});

// We add jsonParser as middleware. This middelware will be run before the handler has run.
app.post('/events', jsonParser, (request, response) => {
  let newEvent =  request.body;
  let events = mongoUtil.events();

  events.insertOne(newEvent);

  response.sendStatus(201); 
});


app.get('/categories/:categoryName/:eventName', (request, response) => {
  let categoryName = request.params.categoryName;
  let events = mongoUtil.events();
  // TODO: find out how to query for an object that is located in the array of an object in a collection
  events.find({category: categoryName}).limit(1).next((err, doc) => {
    if(err) {
      response.sendStatus(400);
    }
    response.json(doc);
  })
});


app.listen(3000, () => {
  console.log('Listening on port 3000...');
});