//'use strict';

angular.module('amcomanApp', ['ui.router', 'ui.grid', 'ngResource', 'ngDialog', 'ngSanitize'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

        // route for the home page
            .state('app', {
                url: '/',
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
                url: 'nutrient/article/:productId',params : {backPageData: null},
                views: {
                    'header@': {
                        templateUrl: 'views/headerArticleList.html',
                        controller: 'HeaderController'
                    },
                    'content@': {
                        templateUrl: 'views/article.html',
                        controller: 'ArticleController'
                    }
                }})

                            // route for the admin home page
            // .state('app.admin', {
            //     name : 'admin',
            //     url:  'admin',
            //     views: {
            //         // 'navigation': {
            //         //     templateUrl: 'views/navigation.html',
            //         //     controller: 'NavController'
            //         // },
            //         // 'header': {
            //         //     templateUrl: 'views/header.html',
            //         //     controller: 'HeaderController'
            //         // },
            //          'content@': {
            //             templateUrl: 'views/admin/home.html',
            //             controller: 'HomeController'
            //         }
            //     //     'footer': {
            //     //         templateUrl: 'views/footer.html',
            //     //     }
            //     }

            // })

            .state('admin', {
                name: 'admin',
                url: '/admin',
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
                        templateUrl: 'views/admin/home.html',
                        controller: 'HomeController'
                    },
                    'footer': {
                        templateUrl: 'views/footer.html',
                    }
                }

            })
               .state('app.adminnewarticle',{
                    name : 'adminnewarticle',
                    //parent: 'admin',
                    url:'admin/article/new',
                     views:{
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
                .state('app.adminEditArticle',{
                    url:'admin/article/edit',
                     views:{
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
            });

        $urlRouterProvider.otherwise('/');
    });