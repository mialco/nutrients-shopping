angular.module('amcomanApp')
    .controller('AdminArticleController', ['$scope', '$state', 'AdminArticleService',
        function ($scope, $state, AdminArticleService) {

            //can be part of component
            $scope.mode = undefined;
            switch ($state.current.name) {
                case 'app.adminNewArticle':
                    $scope.mode = 'New';
                    $scope.isSaveAllowed = true;
                    $scope.isEditAllowed = false;
                    $scope.isNewAllowed = false;
                    $scope.isDeleteAllowed = false;
                    break;
                case 'app.adminEditArticle':
                    $scope.mode = 'Edit';
                    $scope.isSaveAllowed = true;
                    $scope.isEditAllowed = false;
                    $scope.isNewAllowed = true;
                    $scope.isDeleteAllowed = true;
                    break;

                default:
                    $scope.mode = 'View';
                    $scope.isSaveAllowed = false;
                    $scope.isEditAllowed = true;
                    $scope.isNewAllowed = true;
                    $scope.isDeleteAllowed = true;
            }
            //--end--//


            $scope.product = {};
            $scope.product.imgAlt = "asdad";
            AdminArticleService.product.get({ id: 31741 }, function (data) {
                console.log(JSON.stringify(data));
            }, function (error) {
                console.log(JSON.stringify(error));
            });


            $scope.saveProduct = function(product){
                //call api to save peroduct

                $scope.product = {};
                $scope.form.$dirty = false;
                $state.go("app.aboutus");
                
            }
            //To ask confirmation is user sure to leave the page
            $scope.$on('$stateChangeStart', function (event) {
                if ($scope.form.$dirty) {
                    var answer = confirm("You may have pending changes, are you sure you want to leave this page?")
                    if (!answer) {
                        event.preventDefault();
                    }
                }
            });
        }]);