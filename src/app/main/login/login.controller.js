
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
    // bypass login if user already authenticated
    Auth.$onAuthStateChanged(function( user ) {
        if ( user && $state.current.name == 'login' ) {
            
            user.getToken().then(function( token ) {
                var currentUser = jwtHelper.decodeToken( token );
                
                // if ONLY carrierAdmin, redirect to their dashboard
                if ( currentUser.roles.carrierAdmin && !currentUser.roles.customerAccount ) {
                    $state.go( 'app.carrieradmin_dashboard' );
                } else {
                    $state.go( 'app.consumer_sample' );
                }
            })
        }
    });
    
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