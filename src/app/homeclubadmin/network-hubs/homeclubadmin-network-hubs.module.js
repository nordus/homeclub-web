(function ()
{
    'use strict';

    angular
        .module('app.homeclubadmin.network-hubs',
            [
                // 3rd Party Dependencies
                'datatables'
            ]
        )
        .config( config );

    /** @ngInject */
    function config( $stateProvider )
    {
        // State
        $stateProvider
            .state('app.homeclubadmin_network_hubs', {
                url    : '/homeclubadmin/network-hubs?search',
                views  : {
                    'content@app': {
                        templateUrl: 'app/homeclubadmin/network-hubs/homeclubadmin-network-hubs.html',
                        controller : 'HomeClubAdminNetworkHubsController as vm'
                    }
                },
                resolve: {
                    customerAccounts    : function ( msApi )
                    {
                        return msApi.resolve( 'customerAccounts@get' );
                    },
                    meta                : function (msApi )
                    {
                        return msApi.resolve( 'meta@get' );
                    },
                    networkHubs         : function ( msApi )
                    {
                        return msApi.resolve( 'networkHubs@get' );
                    }
                }
            });
    }
})();