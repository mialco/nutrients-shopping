angular.module('amcomanApp')
    .controller('NutrientsController', ['$scope', '$stateParams','NutrientsService',function($scope, $stateParams,NutrientsService) {
        console.log('Nutrients controller routeParams: CategoryName: ' + $stateParams.categoryName + '--- Page:' + $stateParams.page + '--- Page sizes: ' + $stateParams.pageSize);
        $scope.affiliateDisclosure = 'Disclosure: This is an affiliate website and we may earn comission when you click on some of the links.';
        $scope.pageName = 'This is the dynamic page Name';
        var categoryName = $stateParams.categoryName;
        var page = $stateParams.page;
        var pageSize = $stateParams.pageSize;
        console.log("Nutrients controller calls the resource");
        
        $scope.myData = [
        {
            "firstName": "Cox",
            "lastName": "Carney"
        },{
            "firstName": "Cox1",
            "lastName": "Carney1"
        }];
        
        $scope.data = NutrientsService.nutrients.query({categoryName:categoryName, page:page, pageSize:pageSize},function(data){
            //Data received here from resource

            //console.log('From within the controller we received data from the service');
            //console.log(JSON.stringify(data));
        },function (){
            console.log('From within the controller we received data ERROR from the service');
        }
        );
    }]);