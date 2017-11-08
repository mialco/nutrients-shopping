angular.module('amcomanApp')
.factory('AdminArticleService',['$resource', 'baseURL',function($resource, baseUrl){
    var adminArticleFac ={};
    var urlString = baseUrl ;
    console.log('AdminArticle Service says that baseUrl = ' + baseUrl);
    adminArticleFac.setBearerToken = function (token){
        bearerToken = token;
    };
    var bearerToken ='';
    adminArticleFac.product = function() {
       return $resource(baseUrl+'/aflproducts/:id',{id: '@id'},{'insert': {method:'POST' },'update': {method:'PUT' },'delete': {method:'DELETE'} });
    };

    adminArticleFac.category = function(){
        return $resource(baseUrl+'/category',{},{'query':  {method:'GET', isArray:true}});
    };
    
    return adminArticleFac;
}]);