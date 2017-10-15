angular.module('amcomanApp')
    .factory('AuthInterceptorService', ['$injector','TokenStorage','identityURL','AppId', function ($injector,TokenStorage,identityURL,AppId) {
        var authInterceptorFactory = {};



        var _request = function (config) {

            config.headers = config.headers || {};
            var tokenObj = {};

            tokenObj = TokenStorage.getTokenObject();

            if (tokenObj) {
                config.headers.Authorization = 'Bearer ' + tokenObj.access_token;
            }

            return config;
        }

        var _responseError = function (response) {

            if (response.status === 401) {

                var deferred = $q.defer();
                $injector.get("$http").get(identityURL + '/identity/token/'+AppId).then(function (token) {
                    TokenStorage.storeToken(token);
                    if(TokenStorage.getTokenObject() && TokenStorage.getTokenObject().access_token){
                        $injector.get("$http")(response.config).then(function (resp) {
                            deferred.resolve(resp);
                        }, function (resp) {
                            deferred.reject();
                        });
                    } else {
                        deferred.reject();
                    }

                }, function (response) {
                    deferred.reject();
                    return;
                });
                return deferred.promise;
                
            }
            
        }

        authInterceptorFactory.request = _request;
        authInterceptorFactory.responseError = _responseError;
      
        return authInterceptorFactory;




    }]);