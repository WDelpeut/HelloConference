angular.module('helloConference', [])
.controller('eventsController', function($http) {
    // We only need '/events' because we're serving the javaScript file from our server, localhost, so whatever path
    // we give it to te http.get call, is going to append that path to the url that we're on.
    $http.get('/events').then((response) => {
        this.events = response.data;
    });
    // this.events = ['Polymer Summit', 'The Next Web'];
});