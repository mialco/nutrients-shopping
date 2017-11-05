angular.module('amcomanApp')
    .factory('SearchService', ['$resource', 'baseURL', function ($resource, baseUrl) {
        var searchFac = {};

        searchFac.products = function () {
            return $resource(baseUrl + '/search/:searchTerms/:page/:pageSize',
                { searchTerms: '@searchTerms', page: '@page', pageSize: '@pageSize' },
                {
                    query: {
                        method: 'GET',

                        isArray: true
                    }
                });
        };


        return searchFac;
    }]);