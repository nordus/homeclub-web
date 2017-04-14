(function ()
{
    'use strict';

    angular
        .module( 'app.homeclubadmin.users' )
        .controller( 'UserDialogController', UserDialogController );

    /** @ngInject */
    function UserDialogController( $document, $mdDialog, user )
    {
      var vm          = this;

      // Data
      vm.title        = 'Edit User';
      vm.user         = angular.copy( user );
      console.log( vm.user );

      // Methods
      vm.closeDialog  = function() {
          $mdDialog.hide();
      }
      
      vm.openCreateHomeClubAdminDialog  = function( ev ) {
          $mdDialog.show({
                controller         : 'CreateHomeClubAdminDialogController',
                controllerAs       : 'vm',
                templateUrl        : 'app/homeclubadmin/users/dialogs/create-homeclub-admin/create-homeclub-admin-dialog.html',
                parent             : angular.element( $document.find( '#content-container' ) ),
                targetEvent        : ev,
                clickOutsideToClose: true,
                locals             : {
                    user        : user
                }
            });
      }

      //////////
    }
})();