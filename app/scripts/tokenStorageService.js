angular.module('amcomanApp')
    .factory('TokenStorage', ['CommonData', function ( CommonData) {
        var ts = {};
        var storageKey = 'authData';
        var storedToken  ={};
        var authData = {};
        ts.getAuthObject = function () {

            return JSON.parse(window.localStorage.getItem(storageKey));
            
        };

        ts.getUsername = function(){
            return JSON.parse(window.localStorage.getItem(storageKey)) ? JSON.parse(window.localStorage.getItem(storageKey)).username : undefined;
        };


        ts.storeToken = function (tokenObject) {
            authData.access_token = tokenObject.access_token;
            authData.valid_till = tokenObject.valid_till;
            authData.token_type = tokenObject.token_type;
            authData.username = tokenObject.username;
            authData.isAdmin = tokenObject.isAdmin;
            
            window.localStorage.setItem(storageKey, JSON.stringify(authData));
        };

        ts.clearToken = function (){
            //Previous coding
            // tokenObject =  CommonData.tokenObject;
            // window.localStorage.setItem(storageKey,tokenObject,'','','','',new Date(),false);

            window.localStorage.clear();
        };
        return ts;

    }]);
