(function ()
{
    'use strict';

    angular
        .module( 'app.carrieradmin.dashboard' )
        .controller( 'CarrierAdminDashboardController', CarrierAdminDashboardController );

    /** @ngInject */
    function CarrierAdminDashboardController( $state, aggregates )
    {   
        var vm          = this;

        // Data
        vm.aggregates   = aggregates;
        

        // Methods
        vm.goto         = function( state ) {
            $state.go( state );
        }
        

        //////////
    }
})();
