(function ()
{
    'use strict';

    angular
        .module( 'app.homeclubadmin.users' )
        .controller( 'CreateHomeClubAdminDialogController', CreateHomeClubAdminDialogController );

    /** @ngInject */
    function CreateHomeClubAdminDialogController( $mdDialog, $mdToast, $state, msApi, user )
    {
      var vm          = this;

      // Data
      vm.homeclubAdmin  = {
        user  : user._id
      };
      
      vm.title        = 'Add HomeClub Admin';
      
      vm.user         = angular.copy( user );


      // Methods
      vm.closeDialog  = function() {
          $mdDialog.hide();
      }
      
      vm.saveAdmin    = function() {
        msApi.request( 'homeclubAdmins@save', vm.homeclubAdmin ).then(function( homeclubAdmin ) {
          console.log( homeclubAdmin );
          user.roles.homeClubAdmin  = homeclubAdmin._id;
          
          user.$update(function( updatedUser ) {
            console.log( updatedUser );

            $state.reload().then(function() {
                
                var message = 'HomeClub Admin added!';
                
                $mdToast.show({
                    template : '<md-toast id="language-message" layout="column" layout-align="center start"><div class="md-toast-content">' + message + '</div></md-toast>',
                    hideDelay: 7000,
                    position : 'top right',
                    parent   : '#content'
                });  

            })
          })
        })
      }


      //////////
    }
})();