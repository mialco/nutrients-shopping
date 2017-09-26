angular.module('amcomanApp').component('productImage', {
    templateUrl: 'views/productImage.html',
    bindings: {
        product: '<'
    },
    controller: function () {
        var ctrl = this;
        console.log(ctrl.product);
    }
});