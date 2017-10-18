angular.module('amcomanApp')
    .factory('TokenStorage', ['CommonData', function ( CommonData) {
        var ts = {};
        var storageKey = 'authData';
        var storedToken  ={};
        var authData = {};
        ts.getTokenObject = function () {

            //Previous coding
            // var tokenString = window.localStorage.getItem(storageKey);
            // if (!tokenString){
            //     storedToken = CommonData.storedToken;
            // }
            // else{
            // storedToken = JSON.parse(tokenString);
            // }
            // return storedToken;
            return JSON.parse(window.localStorage.getItem(storageKey)) ? JSON.parse(window.localStorage.getItem(storageKey)).tokenObject : undefined;
            
        };

        ts.getUsername = function(){
            return JSON.parse(window.localStorage.getItem(storageKey)) ? JSON.parse(window.localStorage.getItem(storageKey)).username : undefined;
        }


        ts.storeToken = function (tokenObject) {
            authData.tokenObject = tokenObject;
            //Previous coding
            // var storedToken = CommonData.storedToken;
            // storedToken.tokenObject = tokenObject;
            // storedToken.userName = userName;
            // storedToken.password = password;
            // storedToken.clientId = clientId;
            // storedToken.secret = secret;
            // storedToken.lastUpdated = lastUpdated;
            // storedToken.isValid = isValid;

            authData.tokenObject.validUntill = new Date().getTime() + (tokenObject.expires_in-10)*1000;
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
