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
            authData.expires_in = tokenObject.expires_in;
            authData.token_type = tokenObject.token_type;
            authData.username = tokenObject.username;
            authData.user_role = tokenObject.user_role;
            
            //we should not need this
            //authData.token_valid_untill = new Date().getTime() + (authData.expires_in-10)*1000;
            
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
