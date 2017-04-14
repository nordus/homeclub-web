(function ()
{
    'use strict';

    angular
        .module( 'app.carrieradmin.dashboard', [] )
        .config( config );

    /** @ngInject */
    function config( $stateProvider )
    {
        // State
        $stateProvider
            .state('app.carrieradmin_dashboard', {
                url    : '/carrieradmin/dashboard',
                views  : {
                    'content@app': {
                        templateUrl: 'app/carrieradmin/dashboard/carrieradmin-dashboard.html',
                        controller : 'CarrierAdminDashboardController as vm'
                    }
                },
                resolve: {
                    aggregates  : function ( msApi )
                    {
                        return msApi.resolve('aggregates@get');
                    }
                }
            });
    }
})();