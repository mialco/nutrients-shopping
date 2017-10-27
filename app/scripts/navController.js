angular.module("amcomanApp")
    .controller('NavController', ['$scope', '$state', 'ngDialog','IdentityService', function ($scope, $state,ngDialog,IdentityService) {

        $scope.loggedIn = false;
        $scope.username = '';
        $scope.isAdmin = false;


        $scope.getAuthData =function() {
            var authData = IdentityService.isLoggedIn();
            if (IdentityService.isLoggedIn()) {

                $scope.loggedIn = true;
                $scope.username = IdentityService.getUsername();
                $scope.isAdmin = IdentityService.isAdminUserLoggedIn();
            }else{
                resetUserAndLoginData();
            }
        };

        function resetUserAndLoginData(){
            $scope.loggedIn = false;
            $scope.username = undefined;
            $scope.isAdmin = false;
        }
        $scope.openLogin = function () {
            ngDialog.open({ template: 'views/login.html', scope: $scope, className: 'ngdialog-theme-default', controller: "LoginController" });
        };

        $scope.logout = function () {
            IdentityService.logout();
            $scope.getAuthData();
        };

        $scope.getAuthData();
        // $rootScope.$on('login:Successful', function () {
        //     $scope.loggedIn = AuthFactory.isAuthenticated();
        //     $scope.username = AuthFactory.getUsername();
        //     $scope.isAdmin = AuthFactory.isAdmin();
        // });

        // $rootScope.$on('registration:Successful', function () {
        //     $scope.loggedIn = AuthFactory.isAuthenticated();
        //     $scope.username = AuthFactory.getUsername();
        //     $scope.isAdmin = AuthFactory.isAdmin();
        // });

        // $scope.stateis = function (curstate) {
        //     return $state.is(curstate);
        // };

        // $scope.openRegister = function () {
        //     ngDialog.open({ template: 'views/register.html', scope: $scope, className: 'ngdialog-theme-default', controller: "RegisterController" });
        // };
    }]);
