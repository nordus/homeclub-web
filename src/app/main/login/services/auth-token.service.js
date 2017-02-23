
angular
    .module( 'app.core' )
    .factory( 'AuthToken', AuthToken );


/** @ngInject */
function AuthToken( $window ) {
  var store = $window.localStorage;
  var key = 'auth-token';

  return {
    getToken: function() {
      return store.getItem( key );
    },

    setToken: function( token )  {
      if ( token ) {
        store.setItem( key, token );

        // this won't work on the same browser window / tab that is making the changes
        // — it is really a way for other windows / tabs on the domain to sync
        return $window.addEventListener('storage', function( storageEvent ) {
          if ( storageEvent.key === key ) {
            return $window.location.reload();
          }
        });

      } else {
        return store.removeItem( key );
      }
    }
  };
}