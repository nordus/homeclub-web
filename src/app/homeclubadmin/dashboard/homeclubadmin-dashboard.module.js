(function ()
{
    'use strict';

    angular
        .module('app.homeclubadmin.dashboard', [])
        .config( config );

    /** @ngInject */
    function config( $stateProvider, API_URL, msApiProvider )
    {
        // State
        $stateProvider
            .state('app.homeclubadmin_dashboard', {
                url    : '/homeclubadmin/dashboard',
                views  : {
                    'content@app': {
                        templateUrl: 'app/homeclubadmin/dashboard/homeclubadmin-dashboard.html',
                        controller : 'HomeClubAdminDashboardController as vm'
                    }
                },
                resolve: {
                    aggregates  : function ( msApi )
                    {
                        return msApi.resolve('aggregates@get');
                    }
                }
            });

        // Api
        msApiProvider.setBaseUrl( API_URL );
        msApiProvider.register( 'aggregates', [ '/aggregates' ] );
    }
})();