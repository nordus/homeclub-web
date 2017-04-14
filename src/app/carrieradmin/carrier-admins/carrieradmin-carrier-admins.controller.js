(function ()
{
    'use strict';

    angular
        .module( 'app.carrieradmin.carrierAdmins' )
        .controller( 'CarrierAdminCarrierAdminsController', CarrierAdminCarrierAdminsController );

    /** @ngInject */
    function CarrierAdminCarrierAdminsController( currentUser, msApi )
    {   
        var vm              = this;

        // Data
        msApi.request( 'carrierAdminCarrierAdmins@get' )
            .then(function( resp ) {
                vm.carrierAdmins    = resp;
            });
        

        // Methods
        

        //////////
    }
})();
