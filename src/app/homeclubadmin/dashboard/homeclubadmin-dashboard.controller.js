(function ()
{
    'use strict';

    angular
        .module('app.homeclubadmin.dashboard')
        .controller('HomeClubAdminDashboardController', HomeClubAdminDashboardController);

    /** @ngInject */
    function HomeClubAdminDashboardController( aggregates )
    {   
        var vm          = this;

        // Data
        vm.aggregates   = aggregates;

        // Methods

        //////////
    }
})();
