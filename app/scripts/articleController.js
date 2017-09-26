angular.module('amcomanApp')
.controller('ArticleController', ['$scope', '$stateParams',
    function ($scope, $stateParams) {
        
        $scope.productId = $stateParams.productId;
        $scope.backPageData = $stateParams.backPageData;
    }]);