'use strict';
let express = require('express');
let app = express();

/*
    This is mounting middleware: static (is build in express core).
    Argument is the directory express will read files from and serve those static files.
    Express automatically looks for index.html as your root file.
*/
app.use(express.static(__dirname + '/../'));

/*
    Create end point
    Test end point using curl: curl -i localhost:8181/events
 */
app.get('/events', (request, response) => {
   response.json(['Polymer Summit', 'The Next Web']);
});

app.listen(8181, () => {
    console.log('Listening on port 8181...');
});