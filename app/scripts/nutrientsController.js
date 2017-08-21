angular.module('amcomanApp')
    .controller('NutrientsController', ['$scope', '$stateParams', 'NutrientsService', 'IdentityService', function ($scope, $stateParams, NutrientsService, IdentityService) {
        console.log('Nutrients controller routeParams: CategoryName: ' + $stateParams.categoryName + '--- Page:' + $stateParams.page + '--- Page sizes: ' + $stateParams.pageSize);
        $scope.affiliateDisclosure = 'Disclosure: This is an affiliate website and we may earn comission when you click on some of the links.';
        $scope.pageName = 'This is the dynamic page Name';
        var categoryName = $stateParams.categoryName;
        var page = $stateParams.page;
        var pageSize = $stateParams.pageSize;
        console.log("Nutrients controller calls the resource");
        console.log('Controller says IdentityService,testVar: ' + IdentityService.testVar);
        $scope.gridData = [];
        $scope.gridOptions = {
            enableSorting: false,
            columnDefs: [
                { name: 'Product', field: 'productName' },
                { name: 'Description', field: 'description' }
            ]
        };

        var authData1 = $.param(
            {
                'client_id': encodeURIComponent('ro.client'),
                'client_secret': 'mybestkeptnutrientsshoppingsecret',
                'username': 'mikeo2',
                'password': 'mikeo2',
                'grant_type': 'password'
            }
        );

        var authData2 = $.param(
            {
                'client_secret': 'mybestkeptnutrientsshoppingsecret',
                'client_id': 'nutrientsClient',
                'grant_type': 'client_credentials'
            }
        );

        IdentityService.bearerToken.gettoken(
            [],
            authData1,
            function (data) {
                //IdentityService.bearerToken.save (function(data){
                console.log('Function responded for Identity Service');
                console.log(data);
            },
            function () {
                console.log('ERror getting the token');
            }
        );
        

        $scope.data = NutrientsService.nutrients.query({ categoryName: categoryName, page: page, pageSize: pageSize }, function (data) {
            //Data received here from resource

            //console.log('From within the controller we received data from the service');
            //console.log(JSON.stringify(data));
            $scope.gridData = data.aflProducts;
            $scope.gridOptions.data = data.aflProducts;
        }, function () {
            console.log('From within the controller we received data ERROR from the service');
        }
        );
    }]);