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
        .when('/forecast/:days', {
            templateUrl: 'pages/forecast.html', 
            controller: 'forecastController'
        });
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

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService){
    const API_KEY = '82a5a6d6813a18ef9d5f02be14c18dd1';
    $scope.city = cityService.city;
    $scope.days = $routeParams.days || '2';
    $scope.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast?', {get:{method: 'JSONP'}});
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, appid: API_KEY, cnt: $scope.days });
    $scope.convertToCelsius = function(degk){
        debugger
        return (degk - 273).toFixed(2)
    }
    $scope.convertToDate = function(dt){
        return new Date(dt * 1000)
    }
}]);

// Directives

weatherApp.directive('weatherReport', function(){
    return {
        restrict: 'E',
        templateUrl: 'directives/weatherReport.html',
        replace: true,
        scope: {
            weatherDay: '=',
            convertToStandar: '&',
            convertToDate: '&',
            dateFormat: '@'
        }
    }
});
