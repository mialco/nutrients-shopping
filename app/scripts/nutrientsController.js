angular.module('amcomanApp')
    .controller('NutrientsController', ['$scope', '$stateParams', '$state', 'NutrientsService', 'IdentityService', 'TokenStorage', 'CommonData', 'SimpleMockData',
        function ($scope, $stateParams, $state, NutrientsService, IdentityService, TokenStorage, CommonData, SimpleMockData) {
            console.log('Nutrients controller routeParams: CategoryName: ' + $stateParams.categoryName + '--- Page:' + $stateParams.page + '--- Page sizes: ' + $stateParams.pageSize);
            $scope.affiliateDisclosure = 'Disclosure: This is an affiliate website and we may earn comission when you click on some of the links.';
            $scope.pageName = 'This is the dynamic page Name';
            $scope.categoryName = $stateParams.categoryName;
            $scope.urlPrefix = $state.$current.url.prefix;

            var categoryName = $stateParams.categoryName;
            var page = $stateParams.page;
            var pageSize = $stateParams.pageSize;
            console.log("Nutrients controller calls the resource");
            $scope.productsData = {};
            $scope.gridOptions = {
                enableSorting: false,
                paginationPageSizes: [25, 50, 75],
                paginationPageSize: 25,
                columnDefs: [
                    { name: 'Product', field: 'productName' },
                    { name: 'Description', field: 'description' }
                ],
            };
            
            $scope.pagerData = CommonData.pagerData;
            $scope.stateParams = $stateParams;

            $scope.stateObject = {name : $state.current.name, params : $stateParams};
            
            var getDataFromApi = function () {
                NutrientsService.nutrients().query({
                    categoryName: categoryName,
                    page: page,
                    pageSize: pageSize
                },
                    function (data) {
                      
                        $scope.productsData = data;
                        //$scope.gridOptions.data = data.aflProducts;
                    }, function (error) {
                        console.log('From within the controller we received data ERROR from the service');
                        // $scope.productsData =angular.copy(SimpleMockData.nutrientsList);
                    });
            };

            


            // $scope.data = ensureToken();

            getDataFromApi();

        }]);