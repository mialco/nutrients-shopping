angular.module('amcomanApp')
    .factory('TokenStorage', ['CommonData', function ( CommonData) {
        var ts = {};
        var storageKey = 'bearerToken';
        var storedToken  ={};
        ts.getTokenObject = function () {
            var tokenString = window.localStorage.getItem(storageKey);
            if (!tokenString){
                storedToken = CommonData.storedToken;
            }
            else{
            storedToken = JSON.parse(tokenString);
            }
            return storedToken;
        };


        ts.storeToken = function (tokenObject, userName, password,clientId, secret,lastUpdated, isValid) {
            var storedToken = CommonData.storedToken;
            storedToken.tokenObject = tokenObject;
            storedToken.userName = userName;
            storedToken.password = password;
            storedToken.clientId = clientId;
            storedToken.secret = secret;
            storedToken.lastUpdated = lastUpdated;
            storedToken.isValid = isValid;
            window.localStorage.setItem(storageKey, JSON.stringify(storedToken));
        };

        ts.clearToken = function (){
            tokenObject =  CommonData.tokenObject;
            window.localStorage.setItem(storageKey,tokenObject,'','','','',new Date(),false);
        };
        return ts;

    }]);
