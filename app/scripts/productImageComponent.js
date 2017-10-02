angular.module('amcomanApp').component('productImage', {
    template: '<a ng-href={{$ctrl.resultantLink}} ng-attr-target={{(!$ctrl.product.detailIsActive)?"_blank":undefined}}><img src="{{$ctrl.product.imgUrl}}" alt="{{$ctrl.product.imgAlt}}" class="aflProductListImage"/></a>',
    bindings: {
        product: '<',
        objectToPass: '<'
    },
    controller: ['$state','$httpParamSerializer', function ($state,$httpParamSerializer) {
        var ctrl = this;

        if (ctrl.product.detailIsActive) {

            if (ctrl.objectToPass) {
                
                //productId will be sent as state parameter and the additional data are being sent as query string
                ctrl.resultantLink = $state.href('app.nutrientItem', {productId: ctrl.product.prodId}) +"?"+$httpParamSerializer(ctrl.objectToPass);
            }
            else {
                //case :no additional data passed. This will also result in hiding the back link from article page. As article page won't have info on last page
                ctrl.resultantLink = $state.href('app.nutrientItem', { productId: ctrl.product.prodId });
                
            }
        } else {
            ctrl.resultantLink =  ctrl.product.navigateUrl;
        }

    }]
});