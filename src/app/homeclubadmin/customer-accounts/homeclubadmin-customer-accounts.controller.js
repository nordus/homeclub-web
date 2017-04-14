(function ()
{
    'use strict';

    angular
        .module( 'app.homeclubadmin.customer-accounts' )
        .controller( 'HomeClubAdminCustomerAccountsController', HomeClubAdminCustomerAccountsController );

    /** @ngInject */
    function HomeClubAdminCustomerAccountsController( $document, $mdDialog, $state, carriers, customerAccounts, networkHubs )
    {   
        var vm              = this;

        // Data
        vm.carriers         = carriers;
        vm.customerAccounts = customerAccounts;
        // vm.selectedCarrier  = vm.carriers[0];

        // Methods
        vm.openAddHubDialog = function( ev, accountId ) {
            $mdDialog.show({
                controller         : 'AddHubDialogController',
                controllerAs       : 'vm',
                templateUrl        : 'app/homeclubadmin/customer-accounts/dialogs/add-hub/add-hub-dialog.html',
                parent             : angular.element( $document.find( '#content-container' ) ),
                targetEvent        : ev,
                clickOutsideToClose: true,
                locals             : {
                    $state          : $state,
                    customerAccount : getCustomerAccountById( accountId ),
                    networkHubs     : networkHubs
                }
            });
        };
        
        vm.selectCarrier        = function( c ) {
            vm.selectedCarrier  = c;
        }

        //////////
        function getCustomerAccountById( id ) {
            return vm.customerAccounts.find(function( account ) {
                return account._id === id;
            })
        }
    }
})();
