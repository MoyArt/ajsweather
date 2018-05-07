//Module
let weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);
let weatherApiKey = ac4756a4e6f0981285e1a32d2686fdf8;

//Routes

weatherApp.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })
        .when('/forecast', {
            templateUrl: 'pages/forecast.html',
            controller: 'forecastController'
        })
});

//Services

weatherApp.service('cityService', function(){
    this.city = "New York, NY"
})

//Controllers

weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService){
    $scope.city = cityService.city;
    $scope.$watch('city', function(){
        cityService.city = $scope.city;
    })
}]);

weatherApp.controller('forecastController', ['$scope', 'cityService', function($scope, cityService){
    $scope.city = cityService.city;
}]);