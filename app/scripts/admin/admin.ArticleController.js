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
            $scope.selectedCategories = [];
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
                }, function (error) {
                    console.log(JSON.stringify(error));
                    $scope.product = angular.copy(SimpleMockData.nutrientItem);
                    backedupProductObj = angular.copy($scope.product);
                });
            }

            function getCategories(){
                $scope.categories = [{id:1,name:'abc'},{id:1,name:'pqr'},{id:1,name:'xyz'},{id:1,name:'def'}];
                backedupCategories = angular.copy($scope.categories);
            }
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

            $scope.selectCategory = function(selectedCategory){
                if(selectedCategory){
                    $scope.selectedCategories.push(selectedCategory);
                    $scope.categories.splice($scope.categories.indexOf(selectedCategory),1);
                }
                
            }

            $scope.removeSelectedCategory= function(index){
                $scope.selectedCategories.splice(index,1);

                //restore categories and remove alread exist
                $scope.categories = angular.copy(backedupCategories);

                $scope.categories = _.reject($scope.categories, function(cat){
                    var res =  _.findIndex($scope.selectedCategories,cat);
                    return res!=-1;// should not exist
                });
                
                    
                
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