(function ()
{
    'use strict';

    angular
        .module('fuse')
        .config(config);

    /** @ngInject */
    function config($ariaProvider, $logProvider, uiGmapGoogleMapApiProvider)
    {
        $ariaProvider.config({
            tabindex: false
        });

        // Enable log
        $logProvider.debugEnabled(true);

        // Set options third-party lib
        toastr.options.timeOut = 3000;
        toastr.options.positionClass = 'toast-top-right';
        toastr.options.preventDuplicates = true;
        toastr.options.progressBar = true;

        uiGmapGoogleMapApiProvider.configure({
            //    key: 'your api key',
            v        : '3.exp',
            libraries: 'weather,geometry,visualization'
        });
    }

})();
