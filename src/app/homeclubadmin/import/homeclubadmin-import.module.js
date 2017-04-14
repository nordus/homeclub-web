(function ()
{
    'use strict';

    angular
        .module('app.homeclubadmin.import', [])
        .config( config );

    /** @ngInject */
    function config( $stateProvider )
    {
        // State
        $stateProvider
            .state('app.homeclubadmin_import', {
                url    : '/homeclubadmin/import',
                views  : {
                    'content@app': {
                        templateUrl: 'app/homeclubadmin/import/homeclubadmin-import.html',
                        controller : 'HomeClubAdminImportController as vm'
                    }
                },
                resolve: {
                    carriers        : function ( msApi )
                    {
                        return msApi.resolve( 'carriers@get' );
                    }
                }
            });
    }
})();