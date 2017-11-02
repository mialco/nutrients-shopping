angular.module('amcomanApp')
.controller('SearchController', ['$scope','$stateParams',  function ($scope,$stateParams) {

    $scope.query = $stateParams.query;



}]);