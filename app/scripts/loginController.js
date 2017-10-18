angular.module('amcomanApp')
.controller('LoginController', ['$scope', 'ngDialog', 'IdentityService','AppId', function ($scope, ngDialog, IdentityService,AppId) {

    $scope.doLogin = function () {
        
        console.log($scope.parent);
        IdentityService.login(AppId,$scope.loginData.username,$scope.loginData.password).then(function(data){
            
            console.log(data);
            $scope.$parent.getAuthData();
            ngDialog.close();
            
        },function(error){
            console.log(error);
        });

    };
    

}])