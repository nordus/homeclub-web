(function ()
{
    'use strict';

    angular
        .module('app.core')
        .controller('MsSearchBarController', MsSearchBarController)
        .directive('msSearchBar', msSearchBarDirective);

    /** @ngInject */
    function MsSearchBarController($document)
    {
        var vm = this;

        // Data
        vm.element = undefined;
        vm.expanded = false;

        // Methods
        vm.init = init;
        vm.expand = expand;
        vm.collapse = collapse;

        vm.escKeyEvent = escKeyEvent;

        //////////

        /**
         * Initialize the controller with element
         *
         * @param element
         */
        function init(element)
        {
            vm.element = element;
            vm.expander = element.find('#ms-search-bar-expander');
            vm.collapser = element.find('#ms-search-bar-collapser');

            vm.expander.on('click', vm.expand);
            vm.collapser.on('click', vm.collapse);
        }

        /**
         * Expand
         */
        function expand()
        {
            vm.element.addClass('expanded');
            vm.expanded = true;

            // Esc key event
            $document.on('keyup', vm.escKeyEvent);
        }

        /**
         * Collapse
         */
        function collapse()
        {
            vm.element.removeClass('expanded');
            vm.expanded = false;
        }

        /**
         * Escape key event
         *
         * @param e
         */
        function escKeyEvent(e)
        {
            if ( e.keyCode === 27 )
            {
                vm.collapse();
            }

            $document.off('keyup', vm.escKeyEvent);
        }
    }

    /** @ngInject */
    function msSearchBarDirective()
    {
        return {
            restrict   : 'E',
            scope      : true,
            controller : 'MsSearchBarController as vm',
            templateUrl: 'app/core/directives/ms-search-bar/ms-search-bar.html',
            compile    : function (tElement)
            {
                // Add class
                tElement.addClass('ms-search-bar');

                return function postLink(scope, iElement, iAttrs, MsSearchBarCtrl)
                {
                    // Initialize the controller with element
                    MsSearchBarCtrl.init(iElement);
                };
            }
        };
    }
})();