(function ()
{
    'use strict';

    angular
        .module( 'app.homeclubadmin.carriers' )
        .controller( 'AddCarrierDialogController', AddCarrierDialogController );

    /** @ngInject */
    function AddCarrierDialogController( $mdDialog, $state, msApi, provinces )
    {
        var vm = this;

        // Data
        vm.carrier      = {};

        vm.provinces    = provinces;
     
        // Methods
        vm.addCarrier   = function() {
          msApi.request( 'carriers@save', vm.carrier )
            .then(function( resp ) {
              $state.reload();
            })
        };

        vm.closeDialog  = function() {
          $mdDialog.hide();
        }

        //////////
    }
})();