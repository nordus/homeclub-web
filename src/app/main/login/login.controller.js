
'use strict';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAjtbpiogApAka7uYORh5h67rARmDAgxtM",
    authDomain: "homeclub-api.firebaseapp.com",
    databaseURL: "https://homeclub-api.firebaseio.com",
    storageBucket: "homeclub-api.appspot.com",
    messagingSenderId: "355722539553"
};
firebase.initializeApp(config);


angular
    .module('login')
    .controller('LoginController', LoginController);


/** @ngInject */
function LoginController( $state, Auth, jwtHelper, User )
{
    
    var vm  = this;
    
    // Data

    // Methods

    vm.login    = function( username, password ) {
        User.login( username, password ).then(function success( resp ) {            
            // after a user signs in for the first time, a new user account is created and linked to the credentials
            Auth.$signInWithCustomToken( resp.data.token );
        }, vm.handleError);
    }

    vm.handleError  = function( resp ) {
        console.log( resp );
        alert( '[User.login]  Error: ' + resp.data );
    }
}