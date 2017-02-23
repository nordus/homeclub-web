
angular
    .module( 'app.core' )
    .factory( 'User', User );


/** @ngInject */
function User( $http, API_URL, AuthToken ) {
  return {
    login: function( username, password ) {
      return $http.post( API_URL + '/login', {
        username  : username,
        password  : password
      }).then(function( resp ) {
        AuthToken.setToken( resp.data.token );
        return resp;
      });
    }
  }
}