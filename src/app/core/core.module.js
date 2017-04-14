(function ()
{
    'use strict';

    angular
        .module('app.core',
            [
                'angular-jwt',
                'firebase',
                'ngAnimate',
                'ngAria',
                'ngCookies',
                'ngMessages',
                'ngResource',
                'ngSanitize',
                'ngMaterial',
                'pascalprecht.translate',
                'ui.router'
            ]);
})();