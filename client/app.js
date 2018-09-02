'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';

angular.module('helloConference', [uiRouter])
  .config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/events')

    $stateProvider
      .state('events', {
        url: '/events',
        templateUrl: 'events/events-nav.html',
        resolve: {
          // Don't load the template until you've resolved what's inside here. (To avoid blinking empty brackes blinking)
          eventsService: function ($http) {
            return $http.get('/events');
          }
        },
        controller: function (eventsService) {
          this.events = eventsService.data;
        },
        controllerAs: 'eventsCtrl'
      })
      .state('events.details', {
        url: '/:eventName',
        templateUrl: 'events/events-details.html',
        resolve: {
          // $q is Angular's imlementation of a promise
          eventService: function ($q) {
            return $q((resolve, reject) => {
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
                ]
              }
              resolve({ data: event });
            })
          }
        },
        controller: function (eventService) {
          this.event = eventService.data;
        },
        controllerAs: 'eventCtrl'
      })
  })
