angular.module('amcomanApp')
    .factory('AuthInterceptorService', ['$q', '$injector', 'TokenStorage', 'identityURL', 'AppId', 'spinnerService', '$rootScope', function ($q, $injector, TokenStorage, identityURL, AppId, spinnerService, $rootScope) {

        var authInterceptorFactory = {};



        var _request = function (config) {

            spinnerService.increment();
            config.headers = config.headers || {};
            var tokenObj = {};

            tokenObj = TokenStorage.getAuthObject();

            if (tokenObj) {
                config.headers.Authorization = 'Bearer ' + tokenObj.access_token;
            }

            return config;
        };

        var _responseError = function (response) {
            var deferred = $q.defer();
            if (response.status === 401) {

                $injector.get("$http").get(identityURL + '/identity/token/nutrientsClient').then(function (token) {
                    TokenStorage.storeToken(token.data, "application");

                    //don't retry if an admin token return 401. Just get the application token and redirect user to home page, he/she shall re-try login manually
                    if (response.config.headers.isAdminRequest) {

                        $rootScope.$broadcast('logout');
                        deferred.reject();
                    } else {
                        if (TokenStorage.getAuthObject() && TokenStorage.getAuthObject().access_token) {
                            //original request was not an admin request
                            $injector.get("$http")(response.config).then(function (resp) {
                                deferred.resolve(resp);
                            }, function (resp) {
                                deferred.reject();
                            });
                        } else {
                            deferred.reject();
                        }
                    }

                }, function (response) {
                    deferred.reject();

                });

            } else {
                deferred.reject();
            }

            spinnerService.decrement();
            return deferred.promise;




        };

        var _response = function (response) {
            spinnerService.decrement();

            return response;
        };

        authInterceptorFactory.request = _request;
        authInterceptorFactory.responseError = _responseError;
        authInterceptorFactory.response = _response;

        return authInterceptorFactory;




    }]);