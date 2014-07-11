'use strict';


// Declare app level module which depends on filters, and services
angular.module('zhihuStatsApp', ['zhihuStatsApp.filters', 'zhihuStatsApp.services', 'zhihuStatsApp.directives','ngRoute']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
  }]);
