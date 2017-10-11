angular.module('amcomanApp')
    .controller('AdminArticleController', ['$scope', '$state','$stateParams', 'AdminArticleService','SimpleMockData',
        function ($scope, $state,$stateParams, AdminArticleService,SimpleMockData) {

            //can be part of component
            $scope.mode = undefined;

            //to store product info and reset on click of cancel
            var backedupProductObj = {};

            //To resolve the form variable undefined issue. Ref : https://stackoverflow.com/questions/22436501/simple-angularjs-form-is-undefined-in-scope
            $scope.form = {};
            switch ($state.current.name) {
                case 'app.admin.newarticle':
                    $scope.mode = 'New';
                    break;
                case 'app.admin.editarticle':
                    $scope.mode = 'Edit';
                    break;
                default:
                    $scope.mode = 'View';
                    
            }
            

            if($scope.mode== "New"){
                $scope.product = {};
                $scope.product.imgAlt = "asdad";    
                backedupProductObj = angular.copy($scope.product);
            }else{
                var id = $stateParams.id;
                AdminArticleService.product.get({ id: id }, function (data) {
                    console.log(JSON.stringify(data));
                }, function (error) {
                    console.log(JSON.stringify(error));
                    $scope.product = angular.copy(SimpleMockData.nutrientItem);
                    backedupProductObj = angular.copy($scope.product);
                });
            }

            $scope.saveProduct = function(product){
                //call api to save peroduct
                if($scope.mode=='New')
                {
                    //call POST API
                }
                else{
                    //Call PUT API
                }
                
                $scope.form.adminForm.$dirty = false;
                $state.go("app.admin.viewarticle",{id:$scope.product.prodId});
                
            }

            $scope.cancelChanges = function(){
                $scope.product = angular.copy(backedupProductObj);
                $scope.form.adminForm.$dirty = false;
            }

            $scope.deleteProduct = function(id){
                
                var answer = confirm("Are you sure?")
                if(answer){
                    //call  api to delete the product


                    $scope.form.adminForm.$dirty = false;
                    $state.go("app.admin.newarticle");
                }

            }
            //To ask confirmation is user sure to leave the page
            $scope.$on('$stateChangeStart', function (event) {
                if ($scope.form.adminForm.$dirty) {
                    var answer = confirm("You may have pending changes, are you sure you want to leave this page?")
                    if (!answer) {
                        event.preventDefault();
                    }
                }
            });
        }]);