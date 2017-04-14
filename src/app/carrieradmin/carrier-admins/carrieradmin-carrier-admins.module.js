(function ()
{
    'use strict';

    angular
        .module( 'app.carrieradmin.carrierAdmins', [] )
        .config( config );

    /** @ngInject */
    function config( $stateProvider )
    {
        // State
        $stateProvider
            .state('app.carrieradmin_carrier_admins', {
                url    : '/carrieradmin/carrier_admins',
                views  : {
                    'content@app': {
                        templateUrl: 'app/carrieradmin/carrier-admins/carrieradmin-carrier-admins.html',
                        controller : 'CarrierAdminCarrierAdminsController as vm'
                    }
                }
            });
    }
})();