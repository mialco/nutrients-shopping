angular.module('amcomanApp')
    .factory('IdentityService', ['baseURL', 'identityURL', 'TokenStorage', function (baseUrl, identityURL, TokenStorage) {
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
        identityFac.logout = function () {
            TokenStorage.clearToken();
        }

        identityFac.login = function () {

        }

        // nutrientsFac.nutrients = $resource(baseUrl + '/aflproducts/:categoryName/:page/:pageSize',{categoryName:'@categoryName',page:'@page',pageSize: '@pageSize'}, {
        //     query:{method: 'GET', 
        //     //params: {categoryName:'',page:0 },
        //     isArray: false
        // }});
        return identityFac;
    }]);