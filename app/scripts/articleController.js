angular.module('amcomanApp')
.controller('ArticleController', ['$scope', '$stateParams','NutrientsService','SimpleMockData','PageService','$location',
    function ($scope, $stateParams,NutrientsService,SimpleMockData,PageService,$location) {
        
        var productId = $stateParams.productId;
        $scope.backPageData = $stateParams.backPageData;

        //Defining bearerToken as undefined for now 
        //To Do : Get bearerToken properly whhen connecting app with authentication server
        var bearerToken;
        $scope.queryParamObject = $location.search();

        //Load Item data from the productId received in stateparams
        function getItemDataFromApi(bearerToken) {
            NutrientsService.nutrientItem(bearerToken).query({
                productId: productId
                
            },
                function (data) {

                    $scope.productDetails = data;         
                }, function (error) {
                    
                    //Setting the product details statically
                    //To do: Once the server is set up, populating $scope.productDetails should be the responsibility of above function.
                    // here we should Handle error properly
                    $scope.productDetails = angular.copy(SimpleMockData.nutrientItem);
                    PageService.setPageHeaderData({title :$scope.productDetails.title, metaKeywords : $scope.productDetails.metaKeywords,metaDescription: $scope.productDetails.metaDescription});
                    
                });
        }

        getItemDataFromApi(bearerToken);
        
    }]);