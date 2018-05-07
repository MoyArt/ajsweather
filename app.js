//Module
let weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

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
    this.city = "London"
})

//Controllers

weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService){
    $scope.city = cityService.city;
    $scope.$watch('city', function(){
        cityService.city = $scope.city;
    })
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', function($scope, $resource, cityService){
    const API_KEY = '82a5a6d6813a18ef9d5f02be14c18dd1';
    $scope.city = cityService.city;
    $scope.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast?', {get:{method: 'JSONP'}});
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, appid: API_KEY, cnt: 7 });
    $scope.convertToCelsius = function(degk){
        let degrees = degk - 273;
        return degrees.toFixed(2)
    }
    $scope.convertToDate = function(dt){
        return new Date(dt * 1000)
    }
}]);