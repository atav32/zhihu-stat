'use strict';

/* Controllers */
myApp.controller('UserSearch', function($scope, $http) {
    $scope.progressDisplay = "false"
    $scope.resultDisplay = "false"
    $scope.username = "brianz"
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
            $scope.user = data;
            console.log($scope.user);
            $scope.progressDisplay = "false"
            $scope.resultDisplay = "true"
            console.log($scope);
        }).error(function(data, status, headers, config) {
            console.log("Error");
        });
        return $scope.user;
    }
})
