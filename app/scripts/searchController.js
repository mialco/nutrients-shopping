angular.module('amcomanApp')
    .controller('SearchController', ['$scope', '$stateParams','SearchService','$rootScope','$state',
     function ($scope, $stateParams,SearchService,$rootScope,$state) {

        $scope.query = $stateParams.query;
        $scope.stateObject = {name : $state.current.name, params : $stateParams};
        //If search screen with query called irectly from altering url or simple menu, it should update search text box of navController
        $rootScope.$broadcast('setSearchQuery',angular.copy($scope.query));

        if( $stateParams.query &&  $stateParams.query.length>150){
            $stateParams.query.substring(0,150);
        }
        console.log($scope);
        var searchObj = { searchTerms: $scope.query, page: 1, pageSize: 10 };
        $scope.searchResult = undefined;
        

        SearchService.products().query(searchObj,function (data) {
            $scope.searchResult = data;
            console.log(data);
        }, function (error) {
            console.log(error);
        });
  




    }]);