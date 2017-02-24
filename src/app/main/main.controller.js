(function ()
{
    'use strict';

    angular
        .module('fuse')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController( $firebaseAuth, $scope, $rootScope, $state, AuthToken, jwtHelper )
    {
        $firebaseAuth().$onAuthStateChanged(function( user ) {
            if ( user ) {
                // User is signed in.

            } else {
                // No user is signed in.
                AuthToken.setToken();

                $state.go( 'login' );
            }
        });
        
        // Data

        //////////

        // Remove the splash screen
        $scope.$on('$viewContentAnimationEnded', function (event)
        {
            if ( event.targetScope.$id === $scope.$id )
            {
                $rootScope.$broadcast('msSplashScreen::remove');
            }
        });
    }
})();