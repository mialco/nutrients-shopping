angular.module('amcomanApp')
.factory('IdentityService',['$resource', 'baseURL', 'identityURL',function($resource, baseUrl,identityURL){
    var identityFac ={};
    var urlString = baseUrl ;
    var urlIdentity = identityURL;
    console.log('nutrients Identity Service says that baseUrl = ' + baseUrl);
    console.log('nutrients Identity Service says that identityUrl = ' + urlIdentity);
    
    identityFac.testVar = "Test Variable of identity Service";

   // identityFac.token = $resource(urlIdentity + '/connect/token')
    identityFac.bearerToken  = $resource(urlIdentity + '/connect/token',
    { },    
    {gettoken: 
        {method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }
    }
        );
    // nutrientsFac.nutrients = $resource(baseUrl + '/aflproducts/:categoryName/:page/:pageSize',{categoryName:'@categoryName',page:'@page',pageSize: '@pageSize'}, {
    //     query:{method: 'GET', 
    //     //params: {categoryName:'',page:0 },
    //     isArray: false
    // }});
    return identityFac;
}]);