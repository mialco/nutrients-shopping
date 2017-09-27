angular.module('amcomanApp')
.factory('NutrientsService',['$resource', 'baseURL',function($resource, baseUrl){
    var nutrientsFac ={};
    var urlString = baseUrl ;
    console.log('nutrients Service says that baseUrl = ' + baseUrl);
    nutrientsFac.setBearerToken = function (token){
        bearerToken = token;
    };
    var bearerToken ='';
    nutrientsFac.nutrients = function(bearerToken){return  $resource(baseUrl + '/aflproducts/:categoryName/:page/:pageSize',
    {categoryName:'@categoryName',page:'@page',pageSize: '@pageSize'}, 
    {
        query: {method: 'GET',
        headers: {'Authorization': 'bearer ' + bearerToken}, 
        //params: {categoryName:'',page:0 },
        isArray: false
    }});};

    nutrientsFac.nutrientItem =  function(bearerToken){
        return $resource(baseUrl + '/aflProducts/:productId',
        {productId:'@productId'}, 
        {
            query:{method:'GET',
                headers: {'Authorization': 'bearer ' + bearerToken},
                isArray: false
            }
            }
        )
    };
    return nutrientsFac;
}]);