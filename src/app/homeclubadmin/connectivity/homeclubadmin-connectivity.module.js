(function ()
{
    'use strict';

    angular
        .module('app.homeclubadmin.connectivity',
            [
                // 3rd Party Dependencies
                'datatables'
            ]
        )
        .config( config );

    /** @ngInject */
    function config( $stateProvider, API_URL, msApiProvider )
    {
        // State
        $stateProvider
            .state('app.homeclubadmin_connectivity', {
                url    : '/homeclubadmin/connectivity',
                views  : {
                    'content@app': {
                        templateUrl: 'app/homeclubadmin/connectivity/homeclubadmin-connectivity.html',
                        controller : 'HomeClubAdminConnectivityController as vm'
                    }
                },
                resolve: {
                    histograms  : function ( msApi )
                    {
                        return msApi.resolve('histograms@get');
                    },
                    meta        : function ( msApi )
                    {
                        return msApi.resolve('meta@get');
                    },
                    sensorHubs  : function ( msApi )
                    {
                        return msApi.resolve('sensorHubs@get');
                    }
                }
            });
    }
})();