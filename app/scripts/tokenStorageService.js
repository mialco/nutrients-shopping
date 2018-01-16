angular.module('amcomanApp')
    .factory('TokenStorage', ['CommonData', function (CommonData) {
        var ts = {};
        var storageKey = 'authData';
        var storedToken = {};
        var authData = {};
        ts.getAuthObject = function () {

            return JSON.parse(window.localStorage.getItem(storageKey));

        };



        ts.storeToken = function (tokenObject, tokenOf) {
            authData.access_token = tokenObject.access_token;
            authData.token_type = tokenObject.token_type;
            authData.tokenOf = tokenOf;
            window.localStorage.setItem(storageKey, JSON.stringify(authData));
        };

        ts.clearToken = function () {
            //Previous coding
            // tokenObject =  CommonData.tokenObject;
            // window.localStorage.setItem(storageKey,tokenObject,'','','','',new Date(),false);

            window.localStorage.clear();
        };
        return ts;

    }]);
