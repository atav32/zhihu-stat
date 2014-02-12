'use strict';

/* Controllers */
function UserSearch($scope, $http) {
    console.log($scope);
    $scope.getZhihuUser = function() {
        $http({method: 'GET', url: '/api/zhihuUser?username='+$scope.username}).success(function(data, status, headers, config) {
            $scope.user = data;
            console.log($scope.user);
        }).error(function(data, status, headers, config) {
            console.log("Error");
        });
    }
}
