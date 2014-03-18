'use strict';

/* Controllers */
function UserSearch($scope, $http) {
    $scope.progressDisplay = "false"
    $scope.resultDisplay = "false"
    console.log($scope);
    $scope.getZhihuUser = function() {
        $scope.progressDisplay = "true"
        $http({method: 'GET', url: '/api/zhihuUser?username='+$scope.username}).success(function(data, status, headers, config) {
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
}
