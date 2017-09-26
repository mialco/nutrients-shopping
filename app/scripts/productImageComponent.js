angular.module('amcomanApp').component('productImage', {
    template: '<img src="{{$ctrl.product.imgUrl}}" alt="{{$ctrl.product.imgAlt}}" class="aflProductListImage" ng-click="$ctrl.onImageclick($ctrl.product.prodId)"/>',
    bindings: {
        product: '<',
        onProductSelect: '&'
    },
    controller: ['$state', function ($state) {
        var ctrl = this;
        

        ctrl.onImageclick = function (productId) {
            if (ctrl.onProductSelect) {
                ctrl.onProductSelect({productId : productId});
            } else if (ctrl.product.detailIsActive) {
                $state.go("app.nutrientItem", { productId: productId });
            }
            else {
                window.open(
                    ctrl.product.navigateUrl,
                    '_blank'
                );
                
            }

        }

    }]
});