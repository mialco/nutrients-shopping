angular.module('amcomanApp')
    .controller('GlobalController', ['$scope', 'PageService', '$state',

        function ($scope, PageService, $state) {

            $scope.getPageHeaderData = function () {
                return PageService.getPageHeaderData();
            };

        }]);