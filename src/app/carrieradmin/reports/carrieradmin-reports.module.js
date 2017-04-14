(function ()
{
    'use strict';

    angular
        .module( 'app.carrieradmin.reports', [] )
        .config( config );

    /** @ngInject */
    function config( $stateProvider )
    {
        // State
        $stateProvider
            .state('app.carrieradmin_reports', {
                url    : '/carrieradmin/reports',
                views  : {
                    'content@app': {
                        templateUrl: 'app/carrieradmin/reports/carrieradmin-reports.html',
                        controller : 'CarrierAdminReportsController as vm'
                    }
                },
                /** @ngInject */
                resolve : {
                    token   : function( $q, Auth ) {
                        var deferred    = $q.defer();

                        Auth.$requireSignIn()
                            .then(function( user ) {
                                user.getToken().then(function( token ) {
                                    deferred.resolve( token );
                                })
                            })
                            .catch(function( err ) {
                                deferred.reject( err );
                            });

                        return deferred.promise;
                    }
                }
            });
    }
})();