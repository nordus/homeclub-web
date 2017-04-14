(function ()
{
    'use strict';

    angular
        .module('app.homeclubadmin.carrier-admins', [])
        .config( config );

    /** @ngInject */
    function config( $stateProvider )
    {
        // State
        $stateProvider
            .state('app.homeclubadmin_carrier_admins', {
                url    : '/homeclubadmin/carrier-admins',
                views  : {
                    'content@app': {
                        templateUrl: 'app/homeclubadmin/carrier-admins/homeclubadmin-carrier-admins.html',
                        controller : 'HomeClubAdminCarrierAdminsController as vm'
                    }
                },
                resolve: {
                    carrierAdmins   : function ( msApi )
                    {
                        return msApi.resolve( 'carrierAdmins@get' );
                    },
                    carriers        : function ( msApi )
                    {
                        return msApi.resolve( 'carriers@get' );
                    }
                }
            });
    }
})();