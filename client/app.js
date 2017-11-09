angular.module('helloConference', [])
.controller('eventsController', function($http) {
    /*
        We only need '/events' because we're serving the javaScript file from our server, localhost, so whatever path
        we give it to te http.get call, it's going to append that path to the url that we're on.
        The arrow function gives a lexical scope, meaning it binds to function to where it was defined. In this case in the
        controller and not where it is called from.
    */
    $http.get('/events').then((response) => {
        this.events = response.data;
    });
    // this.events = ['Polymer Summit', 'The Next Web'];
});