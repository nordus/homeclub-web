(function ()
{
    'use strict';

    angular
        .module( 'app.homeclubadmin.carrier-admins' )
        .controller( 'HomeClubAdminCarrierAdminsController', HomeClubAdminCarrierAdminsController );

    /** @ngInject */
    function HomeClubAdminCarrierAdminsController( carrierAdmins, carriers )
    {   
        var vm              = this;

        // Data
        vm.carrierAdmins    = carrierAdmins;

        vm.carriers         = carriers;

        // Methods

        //////////
    }
})();
