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
          eventService: function ($http, $stateParams) {
            return $http.get('/events/' + $stateParams.eventName)
          }
        },
        controller: function (eventService) {
          this.event = eventService.data;
        },
        controllerAs: 'eventCtrl'
      })
      .state('events.new', {
        url: '/new',
        templateUrl: 'events/new-event.html',
        controller: function($state) {
          this.saveEvent = (event) => {
            console.log('event: ', event);
            $state.go('events');
          }
        },
        controllerAs: 'newEventCtrl'
      })
  })
