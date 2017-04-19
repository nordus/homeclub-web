
angular
    .module( 'login' )
    .run( runBlock );

/** @ngInject */
function runBlock( $firebaseAuth, $rootScope, $state, jwtHelper )
{
  $firebaseAuth().$onAuthStateChanged(function( user ) {
        
        // bypass login if user already authenticated
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
  
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireSignIn promise is rejected
    // and redirect the user back to the login page
    if ( error === 'AUTH_REQUIRED' ) {
      $state.go( 'login' );
    }
  });
}