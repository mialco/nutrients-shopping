angular.module('amcomanApp')
    .factory('AuthInterceptorService', ['$q','$injector','TokenStorage','identityURL','AppId','spinnerService','$rootScope', function ($q,$injector,TokenStorage,identityURL,AppId,spinnerService,$rootScope) {

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
            var deferred ;
            if (response.status === 401) {               
                deferred = $q.defer();
                $injector.get("$http").get(identityURL + '/identity/token/nutrientsClient').then(function (token) {
                    TokenStorage.storeToken(token.data,"application");
                    if(TokenStorage.getAuthObject() && TokenStorage.getAuthObject().access_token){
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
            
            spinnerService.decrement();
            

            
        };

        var _response = function(response){
            spinnerService.decrement();
            
            return response;
        };

        authInterceptorFactory.request = _request;
        authInterceptorFactory.responseError = _responseError;
        authInterceptorFactory.response = _response;
      
        return authInterceptorFactory;




    }]);