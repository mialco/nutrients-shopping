
/*var jsClient = new Client()
{
    ClientId : "js",
    ClientName : "JavaScript Client",
    ClientUri :"http://identityserver.io",

    AllowedGrantTypes : GrantTypes.Implicit,
    AllowAccessTokensViaBrowser : true,

    RedirectUris :           { "http://localhost:7017/index.html" },
    PostLogoutRedirectUris = { "http://localhost:7017/index.html" },
    AllowedCorsOrigins =     { "http://localhost:7017" },

    AllowedScopes =
    {
        //IdentityServerConstants.StandardScopes.OpenId,
        //IdentityServerConstants.StandardScopes.Profile,
        //IdentityServerConstants.StandardScopes.Email,

        //"api1", "api2.read_only"
    }
};

Next, the UserManager provides a getUser API to know if the user is logged into the JavaScript application. 
It uses a JavaScript Promise to return the results asynchronously. 
The returned User object has a profile property which contains the claims for the user. 
Add this code to detect if the user is logged into the JavaScript application:

Next, we want to implement the login, api, and logout functions. 
The UserManager provides a signinRedirect to log the user in, and a signoutRedirect to log the user out. 
The User object that we obtained in the above code also has an access_token property 
which can be used to authenticate with a web API. 
The access_token will be passed to the web API via the Authorization header with the Bearer scheme. 
Add this code to implement those three functions in our application:

*/
// var identityConfig = {
//     authority: "http://localhost:5000",
//     client_id: "nutrientsClient",   
//     redirect_uri: "http://localhost:3000/#!/login",
//     response_type: "id_token token",
//     scope:"openid profile nutrientsApi",
//     post_logout_redirect_uri : "http://localhost:3000/index.html",
//     //grant_type:"client_credentials",
//     //client_secret:"mybestkeptnutrientsshoppingsecret",
//     //code:"nutrientsApi",
//     issuer: "localhost:3000"
// };

// var identityConfig = {
//     authority: "http://localhost:5000",
//     client_id: "js",
//     redirect_uri: "http://localhost:3000/#!/aboutus",
//     response_type: "id_token token",
//     scope:"openid profile nutrientsApi",
//     post_logout_redirect_uri : "http://localhost:3000/index.html"
//  };

// var mgr = new Oidc.UserManager(identityConfig);

// mgr.getUser().then(function (user) {
//     if (user) {
//         console.log("User logged in", user.profile);
//     }
//     else {
//         console.log("User not logged in");
//     }
// }, function(){
//     console.log('response error from user login');
// });

// function login() {
//     console.log('Login function called');
//     mgr.signinRedirect();
//     console.log('about to exit login function');
// }

// function api() {
//     console.log("Calling the API function");
//     mgr.getUser().then(function (user) {
//         var url = "http://localhost:5001/identity";

//         var xhr = new XMLHttpRequest();
//         xhr.open("GET", url);
//         xhr.onload = function () {
//             log(xhr.status, JSON.parse(xhr.responseText));
//         };
//         xhr.setRequestHeader("Authorization", "Bearer " + user.access_token);
//         xhr.send();
//     });
// }

// function logout() {
//     mgr.signoutRedirect();
// }

// function requestToken(){}

/* This HTML file is the designated redirect_uri page once the user has logged into IdentityServer. 
It will complete the OpenID Connect protocol sign-in handshake with IdentityServer. 
The code for this is all provided by the UserManager class we used earlier. 
Once the sign-in is complete, we can then redirect the user back to the main index.html page. 
Add this code to complete the signin process:*/

/*
new Oidc.UserManager().signinRedirectCallback().then(function () {
            window.location = "index.html";
        }).catch(function (e) {
            console.error(e);
        });

 */