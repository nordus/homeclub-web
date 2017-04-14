(function ()
{
    'use strict';

    angular
        .module('app.homeclubadmin.carriers', [])
        .config( config );

    /** @ngInject */
    function config( $stateProvider )
    {
        // State
        $stateProvider
            .state('app.homeclubadmin_carriers', {
                url    : '/homeclubadmin/carriers',
                views  : {
                    'content@app': {
                        templateUrl: 'app/homeclubadmin/carriers/homeclubadmin-carriers.html',
                        controller : 'HomeClubAdminCarriersController as vm'
                    }
                },
                resolve: {
                    carriers        : function ( msApi )
                    {
                        return msApi.resolve( 'carriers@get' );
                    },
                    provinces       : function( msApi )
                    {
                        return msApi.resolve( 'provinces@get' );
                    }
                }
            });
    }
})();