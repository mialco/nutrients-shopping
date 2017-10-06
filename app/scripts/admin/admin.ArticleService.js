angular.module('amcomanApp')
.factory('AdminArticleService',['$resource', 'baseURL',function($resource, baseUrl){
    var adminArticleFac ={};
    var urlString = baseUrl ;
    console.log('AdminArticle Service says that baseUrl = ' + baseUrl);
    adminArticleFac.setBearerToken = function (token){
        bearerToken = token;
    };
    var bearerToken ='';
    adminArticleFac.product = $resource(baseUrl+'/aflproducts/:id',{id: '@id'});
    
    


    // nutrientsFac.nutrients = function(bearerToken){return  $resource(baseUrl + '/aflproducts/:categoryName/:page/:pageSize',
    // {categoryName:'@categoryName',page:'@page',pageSize: '@pageSize'}, 
    // {
    //     query: {method: 'GET',
    //     headers: {'Authorization': 'bearer ' + bearerToken}, 
    //     //params: {categoryName:'',page:0 },
    //     isArray: false
    // }});};

    // nutrientsFac.nutrientItem =  function(bearerToken){
    //     return $resource(baseUrl + '/aflProducts/:productId',
    //     {productId:'@productId'}, 
    //     {
    //         query:{method:'GET',
    //             headers: {'Authorization': 'bearer ' + bearerToken},
    //             isArray: false
    //         }
    //         }
    //     )
    // };
    return adminArticleFac;
}]);