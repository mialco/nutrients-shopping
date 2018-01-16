//'use strict';

angular.module('amcomanApp', ['ui.router', 'ui.grid', 'ngResource', 'ngDialog', 'ngSanitize'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            // route for the home page
            .state('app', {
                url: '/',
                params : {
                    logout : false
                },
                views: {
                    'navigation': {
                        templateUrl: 'views/navigation.html',
                        controller: 'NavController'
                    },
                    'header': {
                        templateUrl: 'views/header.html',
                        controller: 'HeaderController'
                    },
                    'content': {
                        templateUrl: 'views/home.html',
                        controller: 'HomeController'
                    },
                    'footer': {
                        templateUrl: 'views/footer.html',
                    }
                }

            })


            // route for the aboutus page
            .state('app.aboutus', {
                url: 'aboutus',
                views: {
                    'content@': {
                        templateUrl: 'views/aboutus.html',
                        controller: 'AboutController'
                    }
                }
            })

            // route for the contactus page
            .state('app.contactus', {
                url: 'contactus',
                views: {
                    'content@': {
                        templateUrl: 'views/contactus.html',
                        controller: 'ContactController'
                    }
                }
            })

            .state('app.login', {
                url: 'login',
                views: {
                    'content@': {
                        templateUrl: "views/login.html"
                    }
                }
            })
            .state('app.nutrients', {
                url: 'nutrient/:categoryName/:page/:pageSize',
                views: {
                    'header@': {
                        templateUrl: 'views/headerArticleList.html',
                        controller: 'HeaderController'
                    },
                    'content@': {
                        templateUrl: 'views/nutrients.html',
                        controller: 'NutrientsController'

                    }
                }

            })
            .state('app.nutrientItem', {
                url: 'nutrient/article/:productId', params: { backPageData: null },
                views: {
                    'header@': {
                        templateUrl: 'views/headerArticleList.html',
                        controller: 'HeaderController'
                    },
                    'content@': {
                        templateUrl: 'views/article.html',
                        controller: 'ArticleController'
                    }
                }
            })
            .state('app.search', {
                url: 'search/:searchTerms/:page/:pageSize',
                views: {
                    'header@': {
                        templateUrl: 'views/headerArticleList.html',
                        controller: 'HeaderController'
                    },
                    'content@': {
                        templateUrl: 'views/search.html',
                        controller: 'SearchController'

                    }
                }

            })
            .state("app.admin", {
                name: "admin",
                abstract: true
            })
            .state('app.admin.newarticle', {
                url: 'admin/product/new',
                views: {
                    'header@': {
                        templateUrl: 'views/headerArticleList.html',
                        controller: 'HeaderController'
                    },
                    'content@': {
                        templateUrl: 'views/admin/article.html',
                        controller: 'AdminArticleController'
                    }
                }
            })
            .state('app.admin.editarticle', {
                url: 'admin/product/edit/:id',
                views: {
                    'header@': {
                        templateUrl: 'views/headerArticleList.html',
                        controller: 'HeaderController'
                    },
                    'content@': {
                        templateUrl: 'views/admin/article.html',
                        controller: 'AdminArticleController'
                    }
                }
            })
            .state('app.admin.viewarticle', {
                url: 'admin/product/view/:id',
                views: {
                    'header@': {
                        templateUrl: 'views/headerArticleList.html',
                        controller: 'HeaderController'
                    },
                    'content@': {
                        templateUrl: 'views/admin/article.html',
                        controller: 'AdminArticleController'
                    }
                }
            })
            // route for the dishdetail page
            .state('app.affiliateDisclosure', {
                url: 'affiliateDisclosure',
                views: {
                    'header@': '',
                    'content@': {
                        templateUrl: 'views/affiliateDisclosure.html'
                    }
                }
            })
            .state('app.terms-of-use',{
                url: 'terms-of-use',
                views: {
                    'header@' : '',
                    'content@': {
                        templateUrl : 'views/terms-of-use.html'
                    }
                }
            })
            .state('app.medical-disclaimer',{
                url: 'medical-disclaimer',
                views: {
                    'header@' : '',
                    'content@': {
                        templateUrl : 'views/medical-diclaimer.html'
                    }
                }
            })
            .state('app.privacy-policy',{
                url: 'privacy-policy',
                views: {
                    'header@' : '',
                    'content@': {
                        templateUrl : 'views/privacy-policy.html'
                    }
                }
            })
            ;

        $urlRouterProvider.otherwise('/');
    })
    // .run(['IdentityService', function (IdentityService) {
    //     //to get the token onLoad of page itself
    //     IdentityService.getToken();
    // }]);
    .config(['$httpProvider', function($httpProvider) {  
        $httpProvider.interceptors.push('AuthInterceptorService');
    }])
    .run(['$rootScope','$state','IdentityService','PageService',function($rootScope,$state,IdentityService,PageService){
        $rootScope.$on('$stateChangeStart', 
        function(event, toState, toParams, fromState, fromParams){ 

            //clear search box if the state is not related to search
            //Otherwise the searched text will aleays be shown in the searchbox
            //The clearSearchQuery funtion is part of navController
            if(!toState.name.startsWith("app.search")){
                $rootScope.$broadcast('clearSearchQuery');
            }          
            if(toState.name.startsWith("app.admin") && !IdentityService.isAdminUserLoggedIn()){
                $state.go("app");
            }
            if(fromState.name == "app.nutrientItem"){
                PageService.setDefaultPageHeaderData();
            }
        });

        $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
            //save the previous state in a rootScope variable so that it's accessible from everywhere
            $rootScope.previousStateInfo =  $rootScope.previousStateInfo || {};
            $rootScope.previousStateInfo.name = from.name;
            $rootScope.previousStateInfo.params = fromParams;
        });
      
    }]);    