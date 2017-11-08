angular.module('amcomanApp').component('productList', {
    templateUrl: 'views/productList.html',
    bindings: {
        products: '<'
    },
    controller: ['$state', function ($state) {
        var ctrl = this;

    }]
});