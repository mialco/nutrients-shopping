angular.module('amcomanApp').component('pager', {
    templateUrl: 'component/pager/pager.component.html',
    bindings: {
        stateObj: '<', //in form of {name : "stateName", params: {param1: "", param2: 0}}
        totalPages: '<',
        currentPage : '<'
    },
    controller: ['$state', function ($state) {
        var ctrl = this;
        // ctrl.$onInit = function () {
            //if (ctrl.stateObj.params.page && ctrl.totalPages) {
                ctrl.stateObj.params.page = parseInt(ctrl.currentPage);
                ctrl.totalPages = parseInt(ctrl.totalPages);
                ctrl.isLast = ctrl.stateObj.params.page === ctrl.totalPages;
                ctrl.isFirst = ctrl.stateObj.params.page === 1;



                ctrl.getPreviousLink = function () {
                    var prevParams = angular.copy(ctrl.stateObj.params);
                    prevParams.page = prevParams.page <= 1 ? 1 : prevParams.page - 1;
                    return ctrl.stateObj.name + "(" + JSON.stringify(prevParams) + ")";
                };
                ctrl.getNextLink = function () {
                    var nxtParams = angular.copy(ctrl.stateObj.params);
                    nxtParams.page = nxtParams.page >= ctrl.totalPages ? ctrl.totalPages : nxtParams.page + 1;
                    return ctrl.stateObj.name + "(" + JSON.stringify(nxtParams) + ")";
                };
                ctrl.getFirstPageLink = function () {
                    var fstParams = angular.copy(ctrl.stateObj.params);
                    fstParams.page = 1;
                    return ctrl.stateObj.name + "(" + JSON.stringify(fstParams) + ")";
                };
                ctrl.getLastPageLink = function () {
                    var lstParams = angular.copy(ctrl.stateObj.params);
                    lstParams.page = ctrl.totalPages;
                    return ctrl.stateObj.name + "(" + JSON.stringify(lstParams) + ")";
                };

                
                ctrl.prevLink = ctrl.getPreviousLink();
                ctrl.nxtLink = ctrl.getNextLink();
                ctrl.lstLink = ctrl.getLastPageLink();
                ctrl.fstLink = ctrl.getFirstPageLink();
            // } else {
            //     ctrl.isInvalidaData = true;
            // }
        // }

    }]
});