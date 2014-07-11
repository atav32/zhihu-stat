'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('zhihuStatsApp', ['ngRoute']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
  }]);
