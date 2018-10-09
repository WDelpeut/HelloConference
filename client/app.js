'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';

angular.module('meanProject', [uiRouter])
  .config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/home')

    $stateProvider
      .state('categories', {
        url: '/home',
        templateUrl: 'events/page-nav.html',
        resolve: {
          eventsService: function($http) {
            return $http.get('/categories');
          }
        },
        controller: function(eventsService) {
          this.categories = eventsService.data;
        },
        controllerAs: 'eventsCtrl'
      })
      .state('categories.events', {
        url: '/:categoryName',
        templateUrl: 'events/events-nav.html',
        resolve: {
          // Don't load the template until you've resolved what's inside here. (To avoid blinking empty brackes blinking)
          eventsService: function($http, $stateParams) {
            return $http.get('/categories/' + $stateParams.categoryName)
          }
        },
        controller: function (eventsService) {
          this.categoryName = eventsService.data.category;
          this.events = eventsService.data.events;
        },
        controllerAs: 'eventsCtrl'
      })
      .state('categories.events.details', {
        url: '/:eventName',
        templateUrl: 'events/events-details.html',
        resolve: {
          eventService: function ($http, $stateParams) {
            return $http.get('categories/'  + $stateParams.categoryName + '/' +  + $stateParams.eventName)
          }
        },
        controller: function (eventService, $stateParams) {
          let events = eventService.data.events;
          this.event = events.find(event => event.name === $stateParams.eventName);
        },
        controllerAs: 'eventCtrl'
      })
      .state('events.new', {
        url: '/new',
        templateUrl: 'events/new-event.html',
        controller: function($state, $http) {
          this.saveEvent = (event) => {
            $http.post('/events', event).then(() => {
              $state.go('events');
            })
          }
        },
        controllerAs: 'newEventCtrl'
      })
  })
