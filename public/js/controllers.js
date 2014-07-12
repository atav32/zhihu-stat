'use strict';

/* Controllers */
myApp.controller('UserSearch', function($scope, $http) {
    $scope.progressDisplay = "false"
    $scope.resultDisplay = "false"
    $scope.username = "brian"
    console.log($scope);
    console.log(location.pathname);
    $scope.getZhihuUser = function() {
        $scope.progress = 100;
        $scope.progressDisplay = "true"
        $http({
            method: 'GET', 
            url: location.pathname + 'api/zhihuUser?username=' + $scope.username,
            cache: true
        }).success(function(data, status, headers, config) {
            $scope.users = data;
            console.log($scope.users);
            $scope.progressDisplay = "false"
            $scope.resultDisplay = "true"
            console.log($scope);
        }).error(function(data, status, headers, config) {
            console.log("Error");
        });
        return $scope.users;
    }
})
