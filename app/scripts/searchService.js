angular.module('amcomanApp')
    .factory('SearchService', ['$resource', 'baseURL', function ($resource, baseUrl) {
        var searchFac = {};

        searchFac.products = function () {
            return $resource(baseUrl + '/aflproducts/search/:searchTerms/:page/:pageSize',
                { searchTerms: '@searchTerms', page: '@page', pageSize: '@pageSize' },
                {
                    query: {
                        method: 'GET'
                    }
                });
        };


        return searchFac;
    }]);