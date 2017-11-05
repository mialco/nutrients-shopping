angular.module('amcomanApp')
    .controller('SearchController', ['$scope', '$stateParams', '$resource','baseURL','SearchService',
     function ($scope, $stateParams, $resource,baseUrl,SearchService) {

        $scope.query = $stateParams.query;
        var searchObj = { searchTerms: $scope.query, page: 1, pageSize: 10 };


        SearchService.products().query(searchObj,function (data) {
            console.log(data);
        }, function (error) {
            console.log(error);
        });
  




    }]);