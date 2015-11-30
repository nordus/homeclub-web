(function ()
{
    'use strict';

    angular
        .module('app.core')
        .controller('ThemeOptionsController', ThemeOptionsController);

    /** @ngInject */
    function ThemeOptionsController($cookies, fuseTheming)
    {
        var vm = this;

        // Data
        vm.panelOpen = false;
        vm.themes = fuseTheming.themes;
        vm.layoutMode = 'wide';
        vm.layoutStyle = $cookies.get('layoutStyle') || 'verticalNavigation';

        // Methods
        vm.toggleOptionsPanel = toggleOptionsPanel;
        vm.setActiveTheme = setActiveTheme;
        vm.updateLayoutMode = updateLayoutMode;
        vm.updateLayoutStyle = updateLayoutStyle;

        //////////

        /**
         * Toggle options panel
         */
        function toggleOptionsPanel()
        {
            vm.panelOpen = !vm.panelOpen;
        }

        /**
         * Set active theme
         *
         * @param themeName
         */
        function setActiveTheme(themeName)
        {
            // Set active theme
            fuseTheming.setActiveTheme(themeName);
        }

        /**
         * Update layout mode
         */
        function updateLayoutMode()
        {
            var bodyEl = angular.element('body');

            // Update class on body element
            bodyEl.toggleClass('boxed', (vm.layoutMode === 'boxed'));
        }

        /**
         * Update layout style
         */
        function updateLayoutStyle()
        {
            // Update the cookie
            $cookies.put('layoutStyle', vm.layoutStyle);

            // Reload the page to apply the changes
            location.reload();
        }
    }
})();