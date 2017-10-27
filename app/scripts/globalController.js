angular.module('amcomanApp')
    .controller('GlobalController', ['$scope', 'PageService', '$state',

        function ($scope, PageService, $state) {

            $scope.getPageHeaderData = function () {


                if ($state.current.name == "app.nutrientItem") {
                    //The controller respective to the state should set custom header data if want
                    return PageService.getPageHeaderData();
                } else {

                    return PageService.getDefaultPageHeaderData();
                }
            };
        }]);