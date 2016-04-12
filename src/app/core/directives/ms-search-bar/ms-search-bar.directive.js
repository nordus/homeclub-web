(function ()
{
    'use strict';

    angular
        .module('app.core')
        .directive('msSearchBar', msSearchBarDirective);

    /** @ngInject */
    function msSearchBarDirective($document, $rootScope)
    {
        return {
            restrict   : 'E',
            scope      : {
                clearOnCollapse: '=?',
                debounce: '=?',
            },
            templateUrl: 'app/core/directives/ms-search-bar/ms-search-bar.html',
            compile    : function (tElement)
            {
                // Add class
                tElement.addClass('ms-search-bar');

                return function postLink(scope, iElement, iAttrs)
                {
                    var expanderEl,
                        collapserEl,
                        clearOnCollapse;

                    // Initialize
                    init();

                    function init()
                    {
                        // Figure out the clearOnCollapse status
                        if ( angular.isDefined(scope.clearOnCollapse) )
                        {
                            clearOnCollapse = scope.clearOnCollapse;
                        }
                        else
                        {
                            clearOnCollapse = angular.isDefined(iAttrs.clearOnCollapse);
                        }
                        
                        // Figure out the scope.debounce value
                        scope.debounce = scope.debounce || 0;

                        expanderEl = iElement.find('#ms-search-bar-expander');
                        collapserEl = iElement.find('#ms-search-bar-collapser');

                        expanderEl.on('click', expand);
                        collapserEl.on('click', collapse);
                    }

                    /**
                     * Expand
                     */
                    function expand()
                    {
                        iElement.addClass('expanded');

                        // Esc key event
                        $document.on('keyup', escKeyEvent);
                    }

                    /**
                     * Collapse
                     */
                    function collapse()
                    {
                        iElement.removeClass('expanded');

                        if ( clearOnCollapse )
                        {
                            scope.$evalAsync(function ()
                            {
                                iElement.find('#ms-search-bar-input').val('');
                                $rootScope.global.search = '';
                            });
                        }
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
                            collapse();
                            $document.off('keyup', escKeyEvent);
                        }
                    }
                };
            }
        };
    }
})();