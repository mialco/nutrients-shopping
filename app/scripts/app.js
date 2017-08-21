//'use strict';

angular.module('amcomanApp', ['ui.router','ui.grid', 'ngResource', 'ngDialog','ngSanitize'])
    .config(function($stateProvider, $urlRouterProvider) {
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

        .state('app.login',{
            url: 'login',
            views: {
                'content@' : {
                    templateUrl: "views/login.html"
                }
            }
        })
        // route for the dishdetail page
        .state('app.orgs', {
                url: 'admin/orgs',
                views: {
                    'content@': {
                        templateUrl: 'views/organizations.html',
                        controller: 'OrganizationController'
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

        // route for the dishdetail page
        .state('app.orgDetails', {
            url: 'admin/orgs/details?orgId',
            views: {
                'content@': {
                    templateUrl: 'views/organizationDetails.html',
                    controller: 'OrganizationDetailController'
                }
            }
        })

        // route for the entities
        .state('app.entities', {
            url: 'admin/entities',
            views: {
                'content@': {
                    templateUrl: 'views/entities.html',
                    controller: 'EntityController'
                }
            }
        })

        //route for 
        .state('app.entityDetails', {
            url: 'admin/entities/details?entId?orgId',
            views: {
                'content@': {
                    templateUrl: 'views/entityDetails.html',
                    controller: 'EntityDetailController'
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