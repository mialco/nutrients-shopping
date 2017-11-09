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

        //Will be called from the stateChnage Listerner, if state is not related to search,
        // this will be used to clear the search box
        $rootScope.$on('clearSearchQuery', function () {
            $scope.searchQuery = undefined;
        });

        //Will be usefull if search screen calle from anywhere in the application the search text box should be populated with query
        $rootScope.$on('setSearchQuery', function (event,query) {
            $scope.searchQuery = query;
        });

        $scope.search = function(searchQuery){
            $state.go("app.search",{searchTerms : searchQuery, page:1, pageSize : 10});
        };
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
