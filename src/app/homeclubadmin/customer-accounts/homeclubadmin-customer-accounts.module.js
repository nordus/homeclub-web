(function ()
{
    'use strict';

    angular
        .module('app.homeclubadmin.customer-accounts', [])
        .config( config );

    /** @ngInject */
    function config( $stateProvider )
    {
        // State
        $stateProvider
            .state('app.homeclubadmin_customer_accounts', {
                url    : '/homeclubadmin/customer-accounts',
                views  : {
                    'content@app': {
                        templateUrl: 'app/homeclubadmin/customer-accounts/homeclubadmin-customer-accounts.html',
                        controller : 'HomeClubAdminCustomerAccountsController as vm'
                    }
                },
                resolve: {
                    carriers            : function ( msApi )
                    {
                        return msApi.resolve( 'carriers@get' );
                    },
                    customerAccounts    : function ( msApi )
                    {
                        return msApi.resolve( 'customerAccounts@get' );
                    },
                    networkHubs         : function ( msApi )
                    {
                        return msApi.resolve( 'networkHubs@get' );
                    }
                }
            });
    }
})();