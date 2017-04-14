(function ()
{
    'use strict';

    angular
        .module( 'app.carrieradmin.customer-accounts' )
        .controller( 'CarrierAdminCustomerAccountsController', CarrierAdminCustomerAccountsController );

    /** @ngInject */
    function CarrierAdminCustomerAccountsController( customerAccounts )
    {   
        var vm          = this;

        // Data
        vm.customerAccounts = customerAccounts;


        // Methods
        

        //////////
    }
})();
