(function ()
{
    'use strict';

    angular
        .module('login', [])
        .config(config)
        .constant( 'API_URL', 'http://api.homeclub.us' );

    /** @ngInject */
    function config($httpProvider, $stateProvider, $translatePartialLoaderProvider)
    {
        // add token to headers
        $httpProvider.interceptors.push( 'AuthInterceptor' );
        
        // State
        $stateProvider.state('login', {
            url      : '/login',
            views    : {
                'main@'                       : {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@login': {
                    templateUrl: 'app/main/login/login.html',
                    controller : 'LoginController as vm'
                }
            },
            bodyClass: 'login'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/login');

        // Navigation
        // msNavigationServiceProvider.saveItem('pages.auth', {
        //     title : 'Authentication',
        //     icon  : 'icon-lock',
        //     weight: 1
        // });

        // msNavigationServiceProvider.saveItem('pages.auth.login', {
        //     title : 'Login',
        //     state : 'app.pages_auth_login',
        //     weight: 1
        // });
    }

})();