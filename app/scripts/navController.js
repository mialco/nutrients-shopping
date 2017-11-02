angular.module("amcomanApp")
    .controller('NavController', ['$rootScope', '$scope', '$state', 'ngDialog', 'IdentityService', function ($rootScope, $scope, $state, ngDialog, IdentityService) {

        $scope.loggedIn = false;
        $scope.username = '';
        $scope.isAdmin = false;


        $scope.getAuthData = function () {
            if (IdentityService.tokenExistsOf() === "user") {

                $scope.loggedIn = true;
                $scope.username = IdentityService.getUsername();
                $scope.isAdmin = IdentityService.isAdminUserLoggedIn();
            } else {
                resetUserAndLoginData();
            }
        };

        $rootScope.$on('logout', function () {
            $scope.logout();
        });

        $scope.search = function(searchQuery){
            $state.go("app.search",{query : searchQuery});
        }
        function resetUserAndLoginData() {
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
            if($state.current.name.startsWith("app.admin")){
                $state.go("app");
            }
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
