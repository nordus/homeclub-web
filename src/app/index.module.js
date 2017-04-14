(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [

            'angular-rickshaw',
            
            // Core
            'app.core',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Quick Panel
            // 'app.quick-panel',

            'login',

            'app.consumer',

            'app.carrieradmin',
            
            'app.homeclubadmin'
        ]);
})();