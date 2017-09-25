angular.module('amcomanApp')
    .controller('NutrientsController', ['$scope', '$stateParams','$state', 'NutrientsService', 'IdentityService', 'TokenStorage', 'CommonData','SimpleMockData',
        function ($scope, $stateParams,$state, NutrientsService, IdentityService, TokenStorage, CommonData, SimpleMockData) {
            console.log('Nutrients controller routeParams: CategoryName: ' + $stateParams.categoryName + '--- Page:' + $stateParams.page + '--- Page sizes: ' + $stateParams.pageSize);
            $scope.affiliateDisclosure = 'Disclosure: This is an affiliate website and we may earn comission when you click on some of the links.';
            $scope.pageName = 'This is the dynamic page Name';
            $scope.categoryName =$stateParams.categoryName;
            $scope.urlPrefix  = $state.$current.url.prefix;

            var categoryName = $stateParams.categoryName;
            var page = $stateParams.page;
            var pageSize = $stateParams.pageSize;
            console.log("Nutrients controller calls the resource");
            $scope.gridData = [];
            $scope.gridOptions = {
                enableSorting: false,
                paginationPageSizes : [25,50,75],
                paginationPageSize : 25,
                columnDefs: [
                    {name: 'Product', field: 'productName'},
                    {name: 'Description', field: 'description'}
                ],
            };

            $scope.pagerData = CommonData.pagerData;
            $scope.stateParams = $stateParams;

            //Returns web form data which structure is based on the storedToken
            // If username and password are not empty we return the web form for client credentials
            // else we return web form  data for user authentication
            var authWebFormData = function (storedToken) {
                var wfd = {};
                if (storedToken) {
                    if (storedToken.username && storedToken.password) {
                        wfd = $.param(
                            {
                                'client_secret': 'mybestkeptnutrientsshoppingsecret',
                                'client_id': 'nutrientsClient',
                                'grant_type': 'client_credentials'
                            });
                    } else {
                        wfd = $.param(
                            {
                                'client_id': encodeURIComponent('ro.client'),
                                'client_secret': 'mybestkeptnutrientsshoppingsecret',
                                'username': 'mikeo2',
                                'password': 'mikeo2',
                                'grant_type': 'password'
                            });
                    }
                }
                return wfd;
            };


            //StoredToken object definition
            /*
            var StoredToken = function () {
                this.tokenObject = {};
                this.userName = '';
                this.password = '';
                this.updated = Date.now;
            };
            */


            // Function will obtain a new identity bearer token from the identity Server
            // If the token does not exist or if it is expired
            var bearerToken = '';
            var ensureToken = function (username, password) {

                var storedToken = TokenStorage.getTokenObject();
                //var storedToken = window.localStorage.getItem('storedToken');
                if (!storedToken) {
                    //storedToken = new   StoredToken();
                    storedToken = CommonData.storedToken;
                    storedToken.userName = username;
                    storedToken.password = password;
                }
                var timenow = new Date();
                var lastUpdated = new Date(storedToken.lastUpdated);
                if (timenow - lastUpdated > ((storedToken.tokenObject.expires_in) - 10) * 1000) {
                    storedToken.updated = new Date();
                    storedToken.tokenObject = CommonData.tokenObject;
                    //This is the data  that we post to the server in a webform data format
                    // in order to get theauthentication token
                    var authorizationFromData = authWebFormData(storedToken);
                    IdentityService.bearerToken.gettoken(
                        [],
                        authorizationFromData,
                        function (tokenData) {
                            //IdentityService.bearerToken.save (function(data){
                            console.log('Function responded with the token for Identity Service after token expiration');
                            console.log('Storing the token in teh local storage');
                            var appIdentity = CommonData.applicationIdentity;
                            TokenStorage.storeToken(tokenData, username, password, appIdentity.client_id, appIdentity.client_secret, new Date(), true);
                            console.log(tokenData);
                            bearerToken = tokenData.access_token;
                            getDataFromApi(bearerToken);
                        },
                        function () {
                            console.log('Error getting the token after token expiration');
                        }
                    );

                } else {  // No need to get token from the server and using the one from storage
                    bearerToken = storedToken.tokenObject.access_token;
                    getDataFromApi(bearerToken);
                }

            };


            var getDataFromApi = function (bearerToken) {
                NutrientsService.nutrients(bearerToken).query({
                        categoryName: categoryName,
                        page: page,
                        pageSize: pageSize
                    },
                    function (data) {
                        //Data received here from resource
                        NutrientsService.setBearerToken(bearerToken);
                        // We set the pager information:
                        $scope.pagerData.pageSize = data.pageSize;
                        $scope.pagerData.currentPage=data.page;
                        $scope.pagerData.totalPages = data.pages;
                        calculatePagerValues($scope.pagerData);
                        console.log('From within the controller we received data from the service');
                        //console.log(JSON.stringify(data));
                        $scope.gridData = data.aflProducts;
                        //$scope.gridOptions.data = data.aflProducts;
                    }, function (error) {
                        console.log('From within the controller we received data ERROR from the service');
                        $scope.gridData = SimpleMockData.nutrientsList.aflProducts;
                    });
            };

            var getItemDataFromApi = function (bearerToken) {
                NutrientsService.nutrientItem(bearerToken).query({
                        productId: categoryName,
                        page: page,
                        pageSize: pageSize
                    },
                    function (data) {
                        //Data received here from resource
                        NutrientsService.setBearerToken(bearerToken);
                        // We set the pager information:
                        $scope.pagerData.pageSize = data.pageSize;
                        $scope.pagerData.currentPage=data.page;
                        $scope.pagerData.totalPages = data.pages;
                        calculatePagerValues($scope.pagerData);
                        console.log('From within the controller we received data from the service');
                        //console.log(JSON.stringify(data));
                        $scope.gridData = data.aflProducts;
                        //$scope.gridOptions.data = data.aflProducts;
                    }, function (error) {
                        console.log('From within the controller we received data ERROR from the service');
                        $scope.gridData = SimpleMockData.nutrientsList.aflProducts;
                    });
            };


            $scope.data = ensureToken();



            // It takes the currunt values of the pager and it calculates the next and previous page
            // in such way that will not go over the boudaries
            var calculatePagerValues = function(pagerData){
                pagerData.nextPage = Math.min(pagerData.totalPages, pagerData.currentPage+1);
                pagerData.previousPage = Math.max(1, pagerData.currentPage-1);
                pagerData.isLast = pagerData.currentPage === pagerData.totalPages ;
                pagerData.isFirst = pagerData.currentPage === 1;
                //ui-sref="app.nutrients({categoryName:'Allergy &amp; Sinus',page:1, pageSize: 20})
                //var pageLink = "app.nutrients({categoryName:'" + $scope.stateParams.categoryName + "',page:" + pagerData.next + ",pageSize: 20})";
                var pageLinkRoot = '#!' + $scope.urlPrefix + $scope.stateParams.categoryName + '/';
                var pageLink = pageLinkRoot  + pagerData.nextPage + '/' +  pagerData.pageSize;
                pagerData.nextPageLink =pageLink;
                pagerData.previousPageLink = pageLinkRoot  + pagerData.previousPage + '/' +  pagerData.pageSize;
                pagerData.firstPageLink = pageLinkRoot   + '1/' +  pagerData.pageSize;
                pagerData.lastPageLink = pageLinkRoot  + pagerData.totalPages + '/' +  pagerData.pageSize;
            };

        }]);