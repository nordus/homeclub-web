(function ()
{
    'use strict';

    angular
        .module( 'app.carrieradmin.connectivity', [] )
        .config( config );

    /** @ngInject */
    function config( $stateProvider )
    {
        // State
        $stateProvider
            .state('app.carrieradmin_connectivity', {
                url    : '/carrieradmin/connectivity',
                views  : {
                    'content@app': {
                        templateUrl: 'app/carrieradmin/connectivity/carrieradmin-connectivity.html',
                        controller : 'CarrierAdminConnectivityController as vm'
                    }
                },
                /** @ngInject */
                resolve : {
                    histograms  : function ( msApi )
                    {
                        return msApi.resolve( 'histograms@get' );
                    },
                    meta        : function ( msApi )
                    {
                        return msApi.resolve( 'meta@get' );
                    },
                    sensorHubs  : function ( msApi )
                    {
                        return msApi.resolve( 'sensorHubs@get' );
                    }
                }
            });
    }
})();