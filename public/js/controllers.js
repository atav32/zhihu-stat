'use strict';

/* Controllers */
function UserSearch($scope, $http) {
    $scope.getZhihuUser = function() {
        $http({method: 'GET', url: '/api/zhihuUser'}).success(function(data, status, headers, config) {
            $scope.user = data;
            console.log($scope.user);
        }).error(function(data, status, headers, config) {
            console.log("Error");
        });
    }
}
