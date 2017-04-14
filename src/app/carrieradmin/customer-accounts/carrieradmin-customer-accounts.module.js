(function ()
{
    'use strict';

    angular
        .module( 'app.carrieradmin.customer-accounts', [] )
        .config( config );

    /** @ngInject */
    function config( $stateProvider )
    {
        // State
        $stateProvider
            .state('app.carrieradmin_customer_accounts', {
                url    : '/carrieradmin/customer-accounts',
                views  : {
                    'content@app': {
                        templateUrl: 'app/carrieradmin/customer-accounts/carrieradmin-customer-accounts.html',
                        controller : 'CarrierAdminCustomerAccountsController as vm'
                    }
                },
                resolve: {
                    customerAccounts    : function ( msApi )
                    {
                        return msApi.resolve( 'customerAccounts@get' );
                    }
                }
            });
    }
})();