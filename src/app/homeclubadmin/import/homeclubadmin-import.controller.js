(function ()
{
    'use strict';

    angular
        .module( 'app.homeclubadmin.import' )
        .controller( 'HomeClubAdminImportController', HomeClubAdminImportController );

    /** @ngInject */
    function HomeClubAdminImportController( $http, $state, API_URL, carriers )
    {   
        var vm              = this;

        // Data
        vm.carriers         = carriers;

        vm.selectedCarrier  = vm.carriers[0];

        // Methods
        vm.preview          = function( form ) {
            vm.loading = true;
            vm.accounts = void 0;
            vm.duplicateAccounts = void 0;
            return $http.post( API_URL + '/import-google-doc/preview', {
                spreadsheetKey: vm.spreadsheetKey
            }).success((function( _this ) {
                return function( response ) {
                    vm.loading = false;
                    if ( response.duplicateAccounts ) {
                        vm.keys = Object.keys( response.duplicateAccounts[0] );
                        return vm.duplicateAccounts = response.duplicateAccounts;
                    } else {
                        vm.keys = Object.keys( response.accounts[0] );
                        return vm.accounts = response.accounts;
                    }
                };
            })( this ));
        };

        vm.save = function() {
            return $http.post( API_URL + '/import-google-doc', {
                accounts    : vm.accounts,
                carrier     : vm.selectedCarrier
            }).success((function( _this ) {
                return function( response ) {
                    return $state.go( 'app.homeclubadmin_customer_accounts' );
                };
            })( this ));
        };

        //////////
    }
})();
