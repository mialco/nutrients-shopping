angular.module('amcomanApp').component('backLink', {
    template: '<div class="row backLink" ng-if="$ctrl.prevState"><div class="col-md-12"><a  ui-sref="{{$ctrl.getBackState()}}"> &lt; Back to list</a></div></div>',
    
    controller: ['$rootScope', function ($rootScope) {
        var ctrl = this;
        ctrl.prevState = $rootScope.previousStateInfo.name;
        ctrl.getBackState =function(){
            return $rootScope.previousStateInfo.name+"("+JSON.stringify($rootScope.previousStateInfo.params)+")";
        }
       
    }]
});