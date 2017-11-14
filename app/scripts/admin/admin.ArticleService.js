angular.module('amcomanApp')
    .factory('AdminArticleService', ['$resource', 'baseURL', function ($resource, baseUrl) {
        var adminArticleFac = {};
        var urlString = baseUrl;
        console.log('AdminArticle Service says that baseUrl = ' + baseUrl);
        adminArticleFac.setBearerToken = function (token) {
            bearerToken = token;
        };
        var bearerToken = '';
        adminArticleFac.product = function () {
            return $resource(baseUrl + '/aflproducts/:id', { id: '@id' }, { 'insert': { method: 'POST', headers: { 'isAdminRequest': true } }, 'update': { method: 'PUT', headers: { 'isAdminRequest': true } }, 'delete': { method: 'DELETE', headers: { 'isAdminRequest': true } } });
        };

        adminArticleFac.category = function () {
            return $resource(baseUrl + '/category', {}, { 'query': { method: 'GET', isArray: true, headers: { 'isAdminRequest': true } } });
        };

        return adminArticleFac;
    }]);