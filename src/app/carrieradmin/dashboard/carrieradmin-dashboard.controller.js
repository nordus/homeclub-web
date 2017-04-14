(function ()
{
    'use strict';

    angular
        .module( 'app.carrieradmin.dashboard' )
        .controller( 'CarrierAdminDashboardController', CarrierAdminDashboardController );

    /** @ngInject */
    function CarrierAdminDashboardController( aggregates )
    {   
        var vm          = this;

        // Data
        vm.aggregates   = aggregates;
        

        // Methods
        

        //////////
    }
})();
