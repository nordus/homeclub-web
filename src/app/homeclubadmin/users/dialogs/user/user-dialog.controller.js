(function ()
{
    'use strict';

    angular
        .module( 'app.homeclubadmin.users' )
        .controller( 'UserDialogController', UserDialogController );

    /** @ngInject */
    function UserDialogController( $document, $mdDialog, $mdToast, $state, user )
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

      vm.deleteUser   = function( user ) {
        if ( confirm( "Delete " + user.email + "?" ) ) {
          user.$delete(function( resp ) {
            
            var message = user.email + ' deleted!';

            $state.reload().then(function() {
            
                $mdToast.show({
                    template : '<md-toast id="language-message" layout="column" layout-align="center start"><div class="md-toast-content">' + message + '</div></md-toast>',
                    hideDelay: 7000,
                    position : 'top right',
                    parent   : '#content'
                });  

            })

          })
        }
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