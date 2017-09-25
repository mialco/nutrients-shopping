angular.module('amcomanApp')
    .factory('CommonData', function () {
        var cdfac = {};
        var StoredToken;
        StoredToken = function () {
            this.tokenObject = new TokenObject();
            this.userName = '';
            this.password = '';
            this.secret = '';
            this.clientId='';
            this.lastUpdated = new Date();
            this.isValid = false;
        };

        var TokenObject = function () {
            this.access_token = '';
            this.expires_in = -1;
            this.token_type = 'Bearer';
        };

        var ApplicationIdentity = function (){
                this.client_secret = 'mybestkeptnutrientsshoppingsecret';
                this.client_id = 'nutrientsClient';
                this.grant_type = 'client_credentials';
            };
        var PagerData = function (){
            this.currentPage = 1;
            this.totalPages =0;
            this.pageSize = 10;
            this.totalRecords = 0;
            this.nextPage = 0;
            this.previousPage = 0;
            this.isLast = false;
            this.isFirst=true;
            this.nextPageLink = '';
            this.previousPageLink = '';
            this.firstPageLink='';
            this.lastPageLink='';
        };

        cdfac.storedToken = new StoredToken();
        cdfac.tokenObject = new TokenObject();
        cdfac.applicationIdentity = new ApplicationIdentity();
        cdfac.pagerData = new PagerData();
        /*
        cdfac = {
            storedToken : new StoredToken(),
            tokenObject : new TokenObject()
        };
        */
        return cdfac;
    });
