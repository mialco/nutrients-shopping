angular.module('amcomanApp').component('productList', {
    templateUrl: 'views/productList.html',
    bindings: {
        productsData: '<',
        stateObj:'<'
    },
    controller: ['$state', function ($state) {
        var ctrl = this;
        console.log(ctrl.productsData.aflProducts);
    }]
});