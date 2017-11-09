'use strict';
let express = require('express');
let app = express();

app.use(express.static(__dirname + '/../'));

app.listen(8181, () => {
    console.log('Listening on port 8181...');
});