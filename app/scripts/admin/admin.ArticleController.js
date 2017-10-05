angular.module('amcomanApp')
    .controller('AdminArticleController', ['$scope', '$state', '$stateParams', 'NutrientsService', 'SimpleMockData', 'PageService', '$location',
        function ($scope, $state, $stateParams, NutrientsService, SimpleMockData, PageService, $location) {

            //can be part of component
            $scope.mode = undefined;
            switch ($state.current.name) {
                case 'app.adminNewArticle':
                    $scope.mode = 'New';
                    $scope.isSaveAllowed = true;
                    $scope.isEditAllowed = false;
                    $scope.isNewAllowed = false;
                    $scope.isDeleteAllowed =false;
                    break;
                case 'app.adminEditArticle':
                    $scope.mode = 'Edit';
                    $scope.isSaveAllowed = true;
                    $scope.isEditAllowed = false;
                    $scope.isNewAllowed = true;
                    $scope.isDeleteAllowed =true;
                    break;

                default:
                    $scope.mode = 'View';
                    $scope.isSaveAllowed = false;
                    $scope.isEditAllowed = true;
                    $scope.isNewAllowed = true;
                    $scope.isDeleteAllowed =true;
            }
            //--end--//

            
            $scope.product = {};
            $scope.product.imgAlt = "asdad";
        }]);