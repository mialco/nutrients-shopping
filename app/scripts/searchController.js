angular.module('amcomanApp')
    .controller('SearchController', ['$scope', '$stateParams', '$resource','baseURL','SearchService','SimpleMockData',
     function ($scope, $stateParams, $resource,baseUrl,SearchService,SimpleMockData) {

        $scope.query = $stateParams.query;
        var searchObj = { searchTerms: $scope.query, page: 1, pageSize: 10 };
        $scope.searchResult ={};
        

        SearchService.products().query(searchObj,function (data) {
            console.log(data);
        }, function (error) {
            console.log(error);
            $scope.searchResult = SimpleMockData.nutrientsList;
        });
  




    }]);