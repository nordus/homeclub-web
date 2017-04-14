(function ()
{
    'use strict';

    angular
        .module( 'app.consumer.account', [] )
        .config( config );

    /** @ngInject */
    function config( $stateProvider )
    {
        // State
        $stateProvider
            .state('app.consumer_account', {
                url     : '/account',
                views   : {
                    'content@app': {
                        templateUrl: 'app/consumer/account/account.html',
                        controller : 'AccountController as vm'
                    }
                },
                resolve : {
                    customerAccount : function( msApi )
                    {
                        return msApi.resolve( 'customerAccount@get' );
                    },
                    provinces       : function( msApi )
                    {
                        return msApi.resolve( 'provinces@get' );
                    }
                }
            });
    }
})();