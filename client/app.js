'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router' ;

angular.module('helloConference', [uiRouter])
.config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/events')

    $stateProvider
    .state('events', {
        url:'/events',
        templateUrl: 'events/events-nav.html'
    })
})
.controller('eventsController', function($http) {
    // static data in front end application
    // this.events = ["Frontend Developer Love 2019", "VueJS Amsterdam 2019"];

    /*
        Only '/events' is needed because the javaScript file is served from our server, localhost, so whatever path
        is given to te http.get call, it's going to append that path to the current url.
        The arrow function gives a lexical scope, meaning it binds to function to where it was defined. In this case in the
        controller and not where it is called from.
    */
    $http.get('/events').then((response) => {
        this.events = response.data;
    });
});
