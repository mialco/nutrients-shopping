angular.module('amcomanApp')
.controller('LoginController', ['$scope', 'ngDialog', 'IdentityService','AppId', function ($scope, ngDialog, IdentityService,AppId) {

    $scope.doLogin = function () {
        
        IdentityService.login(AppId,$scope.loginData.username,$scope.loginData.password).then(function(data){
            console.log(data);
        },function(error){
            console.log(error);
        });

    };
    

}])