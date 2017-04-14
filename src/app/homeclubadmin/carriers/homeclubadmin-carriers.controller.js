(function ()
{
    'use strict';

    angular
        .module( 'app.homeclubadmin.carriers' )
        .controller( 'HomeClubAdminCarriersController', HomeClubAdminCarriersController );

    /** @ngInject */
    function HomeClubAdminCarriersController( $document, $mdDialog, $state, carriers, provinces )
    {   
        var vm                  = this;

        // Data
        vm.carriers             = carriers;

        // Methods
        vm.openAddCarrierDialog = function( ev )
        {
            $mdDialog.show({
                controller         : 'AddCarrierDialogController',
                controllerAs       : 'vm',
                templateUrl        : 'app/homeclubadmin/carriers/dialogs/add-carrier/add-carrier-dialog.html',
                parent             : angular.element( $document.find( '#content-container' ) ),
                targetEvent        : ev,
                clickOutsideToClose: true,
                locals             : {
                    $mdDialog   : $mdDialog,
                    $state      : $state,
                    provinces   : provinces
                }
            });
        }

        //////////
    }
})();
