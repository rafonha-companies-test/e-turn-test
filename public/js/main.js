angular.module('NewContact', ['ngRoute']).config(function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider.when('/main', {
        templateUrl: 'partials/form.html',
        controller: 'ContactController'
    });

    $routeProvider.otherwise({ redirectTo: '/main' });

})
