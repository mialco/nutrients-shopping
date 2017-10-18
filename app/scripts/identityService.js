angular.module('amcomanApp')
    .factory('IdentityService', ['baseURL', 'identityURL', 'TokenStorage','$resource','$q', function (baseUrl, identityURL, TokenStorage,$resource,$q) {
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
        //     var existingToken = TokenStorage.getTokenObject();
        //     if(existingToken && (existingToken.validUntill > new Date().getTime())){
            
        //         return existingToken;
        //     }else{
        //         identityFac.bearerToken.gettoken({appId : 'nutrientsClient'},function(token){
        //             TokenStorage.storeToken(token);
        //             return TokenStorage.getTokenObject();
        //         })
        //     }

        // }

        identityFac.loginResource =  function(clientId,userName,password){
            return $resource(baseUrl + '/Account/Login',
            undefined, 
            {
                'abc':{method:'POST',params : { clientId : clientId, userName : userName, password:password}}
                }
            )
        };
        identityFac.logout = function () {
            TokenStorage.clearToken();
        }

        identityFac.login = function (clientId,userName,password) {
            var deferred = $q.defer();
            identityFac.loginResource(clientId,userName,password).abc({},function(data){
                //TokenStorage.
                console.log(data);
                deferred.resolve(data);
            },function(error){
                deferred.reject(error);
            });
            return deferred.promise;
        }

        identityFac.getUsername = function(){

        }

        // nutrientsFac.nutrients = $resource(baseUrl + '/aflproducts/:categoryName/:page/:pageSize',{categoryName:'@categoryName',page:'@page',pageSize: '@pageSize'}, {
        //     query:{method: 'GET', 
        //     //params: {categoryName:'',page:0 },
        //     isArray: false
        // }});
        return identityFac;
    }]);