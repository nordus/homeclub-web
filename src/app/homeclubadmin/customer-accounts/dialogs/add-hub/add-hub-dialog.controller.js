(function ()
{
    'use strict';

    angular
        .module( 'app.homeclubadmin.customer-accounts' )
        .controller( 'AddHubDialogController', AddHubDialogController );

    /** @ngInject */
    function AddHubDialogController( $mdDialog, $state, customerAccount, msApi, networkHubs )
    {
        var vm = this;

        // Data
        vm.hub      = {};
     
        // Methods
        vm.addHub   = function() {
          msApi.request( 'networkHubs@save', vm.hub )
            .then(function( resp ) {
                customerAccount.gateways    = customerAccount.gateways.map(function( nh ) {
                    return nh._id;
                });

                customerAccount.gateways.splice( customerAccount.gateways.length, 0, vm.hub._id );

                customerAccount.$update(function( updatedCustomerAccount ) {
                    $state.reload();
                });
            })
        };

        vm.closeDialog  = function() {
          $mdDialog.hide();
        };

        vm.dupeCheck = function( form ) {
            if ( form.macAddress.$valid ) {

                var dupes = networkHubs.filter(function( nh ) {
                    return nh._id === vm.hub._id;
                });
                
                return vm.dupes = Boolean( dupes.length );

            } else {
                return vm.dupes = false;
            }
        };

        //////////
    }
})();