angular.module('amcomanApp')
    .controller('AdminArticleController', ['$scope', '$state','$stateParams', 'AdminArticleService','SimpleMockData',
        function ($scope, $state,$stateParams, AdminArticleService,SimpleMockData) {

            //can be part of component
            $scope.mode = undefined;

            //to store product info and reset on click of cancel
            var backedupProductObj = {};

            var backedupCategories = [];
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
            getCategories();

            if($scope.mode== "New"){
                $scope.product = {};
                $scope.product.imgAlt = "asdad";    
                backedupProductObj = angular.copy($scope.product);
            }else{
                var id = $stateParams.id;
                AdminArticleService.product.get({ id: id }, function (data) {
                    console.log(JSON.stringify(data));
                    $scope.product = angular.copy(data);
                    backedupProductObj = angular.copy($scope.product);
                }, function (error) {
                    console.log(JSON.stringify(error));
                    
                });
            }

            function getCategories(){
                AdminArticleService.category().query(function(data){
                    $scope.categories = data;
                    backedupCategories = angular.copy($scope.categories);
                },function(error){
                    console.log(error);
                });
                
            };
            $scope.saveProduct = function(product){
                //call api to save peroduct
                if($scope.mode=='New')
                {
                    //call POST API
                    //if success
                    $scope.form.adminForm.$dirty = false;
                    $state.go("app.admin.editarticle",{id:$scope.product.prodId});
                }
                else{
                    //Call PUT API

                    //if success
                    $scope.form.adminForm.$dirty = false;
                    $state.go("app.admin.viewarticle",{id:$scope.product.prodId});
                }                
            };

            $scope.cancelChanges = function(){
                $scope.product = angular.copy(backedupProductObj);
                $scope.form.adminForm.$dirty = false;
            };

            $scope.deleteProduct = function(id){
                
                var answer = confirm("Are you sure?");
                if(answer){
                    //call  api to delete the product


                    $scope.form.adminForm.$dirty = false;
                    $state.go("app.admin.newarticle");
                }
            };

            $scope.selectCategory = function(selectedCategory){
                if(selectedCategory){
                    $scope.product.categories = $scope.product.categories || [];
                    $scope.product.categories.push(selectedCategory);
                    $scope.categories.splice($scope.categories.indexOf(selectedCategory),1);
                }
                
            };

            $scope.removeSelectedCategory= function(index){
                $scope.product.categories.splice(index,1);

                //restore categories and remove alread exist
                $scope.categories = angular.copy(backedupCategories);

                $scope.categories = _.reject($scope.categories, function(cat){

                    var res = $scope.product.categories.indexOf(cat);
                    
                    return res!=-1;// should not exist
                });
                
                    
                
            };
            //To ask confirmation is user sure to leave the page
            $scope.$on('$stateChangeStart', function (event) {
                if ($scope.form.adminForm.$dirty) {
                    var answer = confirm("You may have pending changes, are you sure you want to leave this page?");
                    if (!answer) {
                        event.preventDefault();
                    }
                }
            });
        }]);