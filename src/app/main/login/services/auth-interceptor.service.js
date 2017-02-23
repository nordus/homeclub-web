
angular
    .module( 'app.core' )
    .factory( 'AuthInterceptor', AuthInterceptor );


/** @ngInject */
function AuthInterceptor( AuthToken ) {
  return {
    request: function( config ) {
      var token = AuthToken.getToken();

      if ( token ) {
        config.headers = config.headers || {};
        config.headers.Authorization = "Bearer " + token;
      }

      return config;
    }
  };
}