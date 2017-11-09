angular.module('helloConference', [])
    .controller('eventsController', function() {
        this.events = ['Polymer Summit', 'The Next Web'];
    });