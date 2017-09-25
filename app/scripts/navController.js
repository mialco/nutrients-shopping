angular.module("amcomanApp")
    .controller('NavController',['$scope', '$state', '$rootScope', 'ngDialog', 'AuthFactory','NavController', function ($scope, $state, $rootScope, ngDialog, AuthFactory, NavController) {

        $scope.loggedIn = false;
        $scope.username = '';
        $scope.isAdmin = false;

        if (AuthFactory.isAuthenticated()) {
            $scope.loggedIn = true;
            $scope.username = AuthFactory.getUsername();
            $scope.isAdmin = AuthFactory.isAdmin();
        }

        $scope.openLogin = function () {
            ngDialog.open({ template: 'views/login.html', scope: $scope, className: 'ngdialog-theme-default', controller: "LoginController" });
        };

        $scope.logOut = function () {
            //AuthFactory.logout();
            //$scope.loggedIn = false;
            //$scope.username = '';
            //$scope.isAdmin = false;
        };

        $rootScope.$on('login:Successful', function () {
            $scope.loggedIn = AuthFactory.isAuthenticated();
            $scope.username = AuthFactory.getUsername();
            $scope.isAdmin = AuthFactory.isAdmin();
        });

        $rootScope.$on('registration:Successful', function () {
            $scope.loggedIn = AuthFactory.isAuthenticated();
            $scope.username = AuthFactory.getUsername();
            $scope.isAdmin = AuthFactory.isAdmin();
        });

        $scope.stateis = function (curstate) {
            return $state.is(curstate);
        };

        $scope.openRegister = function () {
            ngDialog.open({ template: 'views/register.html', scope: $scope, className: 'ngdialog-theme-default', controller: "RegisterController" });
        };
    }]);
