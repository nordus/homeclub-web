(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [

            // Core
            'app.core',

            // Navigation
            'app.navigation',
            //'app.navigation-classic', // Enable this one if you want to use classic (pre 1.2.0) navigation version

            // Toolbar
            'app.toolbar',

            // Quick panel
            'app.quick-panel',

            // Sample
            'app.sample'
        ]);
})();