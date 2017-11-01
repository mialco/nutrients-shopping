angular.module('amcomanApp')
    .factory('IdentityService', ['baseURL', 'identityURL', 'TokenStorage', '$resource', '$q', 'SimpleMockData', function (baseUrl, identityURL, TokenStorage, $resource, $q, SimpleMockData) {
        var identityFac = {};
        var urlString = baseUrl;
        var urlIdentity = identityURL;
        console.log('nutrients Identity Service says that baseUrl = ' + baseUrl);
        console.log('nutrients Identity Service says that identityUrl = ' + urlIdentity);

        identityFac.testVar = "Test Variable of identity Service";
        // let ResourceService = $injector.get('ResourceService');
        // identityFac.bearerToken = ResourceService.resource(urlIdentity + '/identity/token/:appId',
        // {appId : '@appId'},
        // {
        //     gettoken:
        //     {
        //         method: 'GET',
        //         headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        //     }
        // },undefined,true);

        // identityFac.getToken = function(){
        //     var existingToken = TokenStorage.getAuthObject();
        //     if(existingToken && (existingToken.validUntill > new Date().getTime())){

        //         return existingToken;
        //     }else{
        //         identityFac.bearerToken.gettoken({appId : 'nutrientsClient'},function(token){
        //             TokenStorage.storeToken(token);
        //             return TokenStorage.getAuthObject();
        //         })
        //     }

        // }

        identityFac.loginResource = function (clientId, userName, password) {
            return $resource(baseUrl + '/Account/Login',
                undefined,
                {
                    'post': { method: 'POST', params: { clientId: clientId, userName: userName, password: password } }
                }
            );
        };
        identityFac.logout = function () {
            TokenStorage.clearToken();
        };

        identityFac.login = function (clientId, userName, password) {
            var deferred = $q.defer();
            identityFac.loginResource(clientId, userName, password).post({}, function (data) {

                TokenStorage.storeToken(data,"user");
                deferred.resolve(data);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        identityFac.getUsername = function () {
            return TokenStorage.getAuthObject() ? getDecodedToken().client_id : undefined;
        };

        identityFac.isAdminUserLoggedIn = function () {
            return TokenStorage.getAuthObject() && getDecodedToken().client_isAdmin === "yes";
        };

        identityFac.tokenExistsOf = function () {
            return TokenStorage.getAuthObject() && TokenStorage.getAuthObject().access_token && TokenStorage.getAuthObject().tokenOf;
        };

        identityFac.getTokenValidTill = function () {
            return TokenStorage.getAuthObject() ? getDecodedToken().exp : undefined;
        };


        function getDecodedToken() {
            var rawToken = TokenStorage.getAuthObject();
            if (rawToken) {
                var tokenData = {};
                tokenData.access_token = rawToken.access_token;
                var base64Url = tokenData.access_token.split('.')[1];
                var base64 = base64Url.replace('-', '+').replace('_', '/');
                var convertedToken = JSON.parse(window.atob(base64));
                return convertedToken;
            } else {
                return undefined;
            }
        }
        // nutrientsFac.nutrients = $resource(baseUrl + '/aflproducts/:categoryName/:page/:pageSize',{categoryName:'@categoryName',page:'@page',pageSize: '@pageSize'}, {
        //     query:{method: 'GET', 
        //     //params: {categoryName:'',page:0 },
        //     isArray: false
        // }});
        return identityFac;
    }]);