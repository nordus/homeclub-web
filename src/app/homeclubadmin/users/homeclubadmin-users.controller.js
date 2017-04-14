(function ()
{
    'use strict';

    angular
        .module( 'app.homeclubadmin.users' )
        .controller( 'HomeClubAdminUsersController', HomeClubAdminUsersController );

    /** @ngInject */
    function HomeClubAdminUsersController( $document, $filter, $mdDialog, $mdSidenav, carriers, users )
    {   
        var vm              = this;

        // Data
        vm.carriers         = carriers;

        vm.listType         = 'all';

        vm.users            = users;

        // Methods
        vm.filterChange     = function( type ) {
            vm.listType = type;
        }
        
        vm.invertKeysAndValues  = function( obj ) {
            var objInverted   = {};

            for(var key in obj){
                objInverted[obj[key]] = $filter( 'camelCaseToTitle' )( key );
            }

            return objInverted;
        }

        vm.openUserDialog    = function ( ev, user )
        {
            $mdDialog.show({
                controller         : 'UserDialogController',
                controllerAs       : 'vm',
                templateUrl        : 'app/homeclubadmin/users/dialogs/user/user-dialog.html',
                parent             : angular.element( $document.find('#content-container') ),
                targetEvent        : ev,
                clickOutsideToClose: true,
                locals             : {
                    user        : user
                }
            });
        }
        
        vm.toggleSidenav        = function ( sidenavId )
        {
            $mdSidenav( sidenavId ).toggle();
        }

        //////////
    }
})();
