//'use strict';
angular.module('amcomanApp')
    .constant("AppId", "roclient")
    //.constant("baseURL", "http://localhost:49970/api")
    .constant("baseURL", "http://nutrientsshoppingapi.azurewebsites.net/api")
    .constant('identityURL', "http://nutrientsshoppingapi.azurewebsites.net/api")
    .constant('DefaultAppHeaderData', { title: "Nutrient Shopping. Natural Nutrition Products", metaKeywords: "Nutrition Products,Nutrients,shopping", metaDescription: "Shopping for Nutrition Products" })
    //.constant("baseURL", "https://amcoman.mybluemix.net/")
    .factory('menuFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "dishes/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

    }])


    .factory('$localStorage', ['$window', function ($window) {
        return {
            store: function (key, value) {
                $window.localStorage[key] = value;
            },
            get: function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            remove: function (key) {
                $window.localStorage.removeItem(key);
            },
            storeObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function (key, defaultValue) {
                return JSON.parse($window.localStorage[key] || defaultValue);
            }
        };
    }])

    .factory('AuthFactory', ['$resource', '$http', '$localStorage', '$rootScope', '$window', 'baseURL', 'ngDialog', function ($resource, $http, $localStorage, $rootScope, $window, baseURL, ngDialog) {

        var authFac = {};
        var TOKEN_KEY = 'Token';
        var isAuthenticated = false;
        var username = '';
        var isAdmin = false;
        var authToken;

        
        function loadUserCredentials() {
            var credentials = $localStorage.getObject(TOKEN_KEY, '{}');
            if (credentials.username !== undefined) {
                useCredentials(credentials);
            }
        }

        function storeUserCredentials(credentials) {
            $localStorage.storeObject(TOKEN_KEY, credentials);
            useCredentials(credentials);
        }

        function useCredentials(credentials) {
            isAuthenticated = true;
            username = credentials.username;
            authToken = credentials.token;
            isAdmin = credentials.admin;

            // Set the token as header for your requests!
            $http.defaults.headers.common['x-access-token'] = authToken;
        }

        function destroyUserCredentials() {
            authToken = undefined;
            username = '';
            isAuthenticated = false;
            isAdmin = false;
            $http.defaults.headers.common['x-access-token'] = authToken;
            $localStorage.remove(TOKEN_KEY);
        }

        authFac.login = function (loginData) {
            authFac.test = "xyz";
            // $resource(baseURL + "users/login")
            //     .save(loginData,
            //     function (response) {
            //         storeUserCredentials({
            //             username: loginData.username,
            //             token: response.token,
            //             admin: response.admin
            //         });
            //         $rootScope.$broadcast('login:Successful');
            //     },
            //     function (response) {
            //         isAuthenticated = false;

            //         var message = '<div class="ngdialog-message">' +
            //             '<div><h3>Login Unsuccessful</h3></div>' +
            //             '<div><p>' + response.data.err.message + '</p><p>' +
            //             response.data.err.name + '</p></div>' +
            //             '<div class="ngdialog-buttons">' +
            //             '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button>' +
            //             '</div>';

            //         ngDialog.openConfirm({ template: message, plain: 'true' });
            //     }
            //     );

        };

        authFac.logout = function () {
            $resource(baseURL + "users/logout").get(function (response) {
            });
            destroyUserCredentials();
        };

        authFac.register = function (registerData) {

            $resource(baseURL + "users/register")
                .save(registerData,
                function (response) {
                    authFac.login({
                        username: registerData.username,
                        password: registerData.password,
                        admin: registerData.admin
                    });
                    if (registerData.rememberMe) {
                        $localStorage.storeObject('userinfo',
                            { username: registerData.username, password: registerData.password });
                    }

                    $rootScope.$broadcast('registration:Successful');
                },
                function (response) {

                    var message =
                        '<div class="ngdialog-message">' +
                        '<div><h3>Registration Unsuccessful</h3></div>' +
                        '<div><p>' + response.data.err.message +
                        '</p><p>' + response.data.err.name + '</p></div>';

                    ngDialog.openConfirm({ template: message, plain: 'true' });

                }
                );
        };

        authFac.isAuthenticated = function () {
            return isAuthenticated;
        };

        authFac.getUsername = function () {
            return username;
        };

        authFac.isAdmin = function () {
            return isAdmin;
        };

        loadUserCredentials();

        return authFac;

    }])

    .factory('feedbackFactory', ['$resource', 'baseURL', function ($resource, baseURL) {


        return $resource(baseURL + "feedback/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

    }])

    .factory('OrgFactory', ['$resource', '$http', '$localStorage', '$rootScope', '$window', 'baseURL', 'ngDialog', function ($resource, $http, $localStorage, $rootScope, $window, baseURL, ngDialog) {
        var orgFac = {};
        orgFac.orgs = $resource(baseURL + "orgs/:orgId", { orgId: '@orgId' }, {
            'update': { method: 'PUT' },
            'query': { method: 'GET', isArray: true },
            'getOne': { method: 'GET', isArray: false },
            'save': { method: 'POST' }

        });

        orgFac.ents = $resource(baseURL + "orgs/entity/:orgId/:entId", { orgId: '@orgId', entId: '@entId' }, {
            'update': { method: 'PUT' },
            'delete': { method: 'DELETE' }
        });


        return orgFac;
    }])

    .factory('EntityFactory', ['$resource', '$http', '$localStorage', '$rootScope', '$window', 'baseURL', 'ngDialog', function ($resource, $http, $localStorage, $rootScope, $window, baseURL, ngDialog) {

        var entFac = {};
        entFac.entities = $resource(baseURL + 'entities/:entId', { entId: '@entId' }, {
            'update': {
                method: 'PUT'
            },
            'query': { method: 'GET', isArray: true },
            'getOne': { method: 'GET', isArray: false },
            'save': { method: 'POST' },
            'delete': { method: 'DELETE' }
        });

        entFac.entitiesNotInOrg = $resource(baseURL + 'entities/notinorg/:orgId', { orgId: '@orgId' }, {
            get: {
                method: 'GET',
                isArray: true
            }
        });


        return entFac;
    }])

    .factory('ArticleFactory', ['$resource', '$http', '$localStorage', '$rootScope', '$window', 'baseURL', 'ngDialog', function ($resource, $http, $localStorage, $rootScope, $window, baseURL, ngDialog) {

        var artFac = {};
        artFac.articles = $resource(baseURL + "articles/:artId", { artId: '@artId' }, {
            'update': { method: 'PUT' },
            'query': { method: 'GET', isArray: true },
            'save': { method: 'POST' }
        });


        return artFac;
    }])

    .factory('PageService', ['DefaultAppHeaderData', '$state', function (DefaultAppHeaderData, $state) {

        var pageFac = {};
        var stateData = $state;

        //headerInfo should be in form {title : 'sample title', metaKeywords : 'keyword1,keyword2',metaDescription : 'sample description'}
        pageFac.setPageHeaderData = function (headerInfo) {
            pageFac.title = headerInfo.title;
            pageFac.metaKeywords = headerInfo.metaKeywords;
            pageFac.metaDescription = headerInfo.metaDescription;
        };
        pageFac.getPageHeaderData = function () {
            
            return {
                title: pageFac.title ? pageFac.title + ' | ' + DefaultAppHeaderData.title : DefaultAppHeaderData.title,
                metaKeywords: pageFac.metaKeywords || DefaultAppHeaderData.metaKeywords,
                metaDescription: pageFac.metaDescription || DefaultAppHeaderData.metaDescription
            };

        };
        pageFac.setDefaultPageHeaderData = function () {
            pageFac.setPageHeaderData(DefaultAppHeaderData);
        };
        return pageFac;

    }])
    .factory('spinnerService', function () {
        var spinnerFactory = {};
        spinnerFactory.spinnerCount = 0;
        spinnerFactory.increment = function () {
            angular.element("#loader-div").show();
            spinnerFactory.spinnerCount++;
        };
        spinnerFactory.decrement = function () {
            spinnerFactory.spinnerCount--;
            if(spinnerFactory.spinnerCount<=0){
                spinnerFactory.spinnerCount = 0;
                angular.element("#loader-div").hide();
            }
            return spinnerFactory.spinnerCount;
        };
        return spinnerFactory;
    });