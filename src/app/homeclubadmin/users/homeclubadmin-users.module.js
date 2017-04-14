(function ()
{
    'use strict';

    angular
        .module('app.homeclubadmin.users', [])
        .config( config );

    /** @ngInject */
    function config( $stateProvider )
    {
        // State
        $stateProvider
            .state('app.homeclubadmin_users', {
                url    : '/homeclubadmin/users',
                views  : {
                    'content@app': {
                        templateUrl: 'app/homeclubadmin/users/homeclubadmin-users2.html',
                        controller : 'HomeClubAdminUsersController as vm'
                    }
                },
                resolve: {
                    carriers    : function ( msApi )
                    {
                        return msApi.resolve( 'carriers@get' );
                    },
                    users       : function ( msApi )
                    {
                        return msApi.resolve( 'users@get' );
                    }
                }
            });
    }
})();