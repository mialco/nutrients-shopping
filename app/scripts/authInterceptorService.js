angular.module('amcomanApp')
    .factory('AuthInterceptorService', ['$injector','TokenStorage','identityURL','AppId','spinnerService', function ($injector,TokenStorage,identityURL,AppId,spinnerService) {
        var authInterceptorFactory = {};



        var _request = function (config) {

            spinnerService.increment();
            config.headers = config.headers || {};
            var tokenObj = {};

            tokenObj = TokenStorage.getTokenObject();

            if (tokenObj) {
                config.headers.Authorization = 'Bearer ' + tokenObj.access_token;
            }

            return config;
        }

        var _responseError = function (response) {
            var deferred = undefined;
            if (response.status === 401) {

                deferred = $q.defer();
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
                    
                });
                
            }
            spinnerService.decrement();
            if(deferred){
                return deferred.promise;
            
            }

            
        }

        var _response = function(response){
            spinnerService.decrement();
            
            return response;
        }

        authInterceptorFactory.request = _request;
        authInterceptorFactory.responseError = _responseError;
        authInterceptorFactory.response = _response;
      
        return authInterceptorFactory;




    }]);