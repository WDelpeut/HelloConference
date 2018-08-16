'use strict';
let express = require('express');
let app = express();
// let mongoUtil = require('./mongoUtil')

// mongoUtil.connect();

/*
    This is mounting middleware in express: static (build in express core).
    Argument is the directory express will read files from and serve those static files.
    Express automatically looks for index.html as your root file.
    __dirname stands for current directory that we're on, our server (localhost).
*/
app.use(express.static(__dirname + '/../client'));

/*
    Create end-point
    Test end-point using curl: curl -i localhost:8181/events
 */
// app.get('/events', (request, response) => {
//     let events = mongoUtil.events();
//     events.find().toArray((err, docs) => {
//        console.log(JSON.stringify(docs));
//         /*
//              Returns the name of the results individually (in an array).
//              This argument of the map function is the short version of the arrow function and returns for every
//              element in the collection its name.
//          */
//        let eventNames = docs.map((event) => event.name);
//        response.json(eventNames);
//     });
// });

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});