'use strict';

import angular from 'angular';

angular.module('helloConference', [])
.controller('eventsController', function() {
    this.events = ["Angular Cruise", "Road to React"];
    // /*
    //     Only '/events' is needed because the javaScript file is served from our server, localhost, so whatever path
    //     is given to te http.get call, it's going to append that path to the current url.
    //     The arrow function gives a lexical scope, meaning it binds to function to where it was defined. In this case in the
    //     controller and not where it is called from.
    // */
    // $http.get('/events').then((response) => {
    //     this.events = response.data;
    // });
});
