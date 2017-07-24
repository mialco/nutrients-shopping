angular.module('amcomanApp')
.factory('NutrientsService',['$resource', 'baseURL',function($resource, baseUrl){
    var nutrientsFac ={};
    var urlString = baseUrl ;
    console.log('nutrients Service says that baseUrl = ' + baseUrl);
    nutrientsFac.nutrients = $resource(baseUrl + '/aflproducts/:categoryName/:page/:pageSize',{categoryName:'@categoryName',page:'@page',pageSize: '@pageSize'}, {
        query:{method: 'GET', 
        //params: {categoryName:'',page:0 },
        isArray: false
    }});
    return nutrientsFac;
}]);