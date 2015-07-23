(function ()
{
    'use strict';

    angular
        .module('fuse')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider, $locationProvider)
    {
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);

        $stateProvider

        /**
         * App
         */
            .state('app', {
                abstract: true,
                views   : {
                    'app@'            : {
                        templateUrl: 'app/layout/default.html'
                    },
                    'toolbar@app'     : {
                        templateUrl: 'app/toolbar/toolbar.html',
                        controller : 'toolbarController as vm'
                    },
                    'sidenavLeft@app' : {
                        templateUrl: 'app/sidenav/navigation/nav-sidenav.html',
                        controller : 'navSidenavController as vm'
                    },
                    'sidenavRight@app': {
                        templateUrl: 'app/sidenav/notification/notification-sidenav.html',
                        controller : 'notificationSidenavController as vm'
                    },
                    'themeChanger@app': {
                        templateUrl: 'app/components/theme-changer/theme-changer.html',
                        controller : 'ThemeChangerController as vm'
                    }
                }
            })

            // Dashboard
            .state('app.dashboard', {
                url  : '/',
                views: {
                    'main@app': {
                        templateUrl: 'app/main/dashboard/dashboard.html',
                        controller : 'dashboardController as vm'
                    }
                }
            })

            // Calendar
            .state('app.calendar', {
                url  : '/calendar',
                views: {
                    'main@app': {
                        templateUrl: 'app/main/calendar/calendar.html',
                        controller : 'calendarController as vm'
                    }
                }
            })

            // E-Commerce
            .state('app.e-commerce', {
                url  : '/e-commerce',
                views: {
                    'main@app': {
                        templateUrl: 'app/main/calendar/calendar.html',
                        controller : 'calendarController as vm'
                    }
                }
            })

            // E-Mail
            .state('app.e-mail', {
                url  : '/email',
                views: {
                    'main@app': {
                        templateUrl: 'app/main/mail/mail.html',
                        controller : 'mailController as vm'
                    }
                }
            })

            // File Manager
            .state('app.file-manager', {
                url  : '/file-manager',
                views: {
                    'main@app': {
                        templateUrl: 'app/main/file-manager/file-manager.html',
                        controller : 'fileManagerController as vm'
                    }
                }
            })

            // To-Do
            .state('app.to-do', {
                url  : '/to-do',
                views: {
                    'main@app': {
                        templateUrl: 'app/main/todo/todo.html',
                        controller : 'todoController as vm'
                    }
                }
            })

        /**
         * Pages
         */
            .state('app.pages', {
                abstract: true,
                url     : '/pages'
            })

        /**
         * Authentication
         */
            .state('app.pages.auth', {
                abstract: true,
                url     : '/auth'
            })

            // Login
            .state('app.pages.auth.login', {
                url  : '/login',
                views: {
                    'app@'          : {
                        templateUrl: 'app/layout/basic.html'
                    },
                    'main@app.pages.auth.login': {
                        templateUrl: 'app/main/pages/auth/login/login.html'
                    }
                }
            })

            // Register
            .state('app.pages.auth.register', {
                url  : '/register',
                views: {
                    'app@'             : {
                        templateUrl: 'app/layout/basic.html'
                    },
                    'main@app.pages.auth.register': {
                        templateUrl: 'app/main/pages/auth/register/register.html'
                    }
                }
            })

            // Forgot Password
            .state('app.pages.auth.forgot-password', {
                url  : '/forgot-password',
                views: {
                    'app@'                    : {
                        templateUrl: 'app/layout/basic.html'
                    },
                    'main@app.pages.auth.forgot-password': {
                        templateUrl: 'app/main/pages/auth/forgot-password/forgot-password.html'
                    }
                }
            })

            // Lock
            .state('app.pages.auth.lock', {
                url  : '/lock',
                views: {
                    'app@'         : {
                        templateUrl: 'app/layout/basic.html'
                    },
                    'main@app.pages.auth.lock': {
                        templateUrl: 'app/main/pages/auth/lock/lock.html'
                    }
                }
            })

            // Coming Soon
            .state('app.pages.coming-soon', {
                url  : '/coming-soon',
                views: {
                    'app@'                : {
                        templateUrl: 'app/layout/basic.html'
                    },
                    'main@app.coming-soon': {
                        templateUrl: 'app/main/pages/coming-soon/coming-soon.html'
                    }
                }
            })

            /*
             * Errors
             */
            .state('app.pages.errors', {
                abstract: true,
                url     : '/errors'
            })

            // 404
            .state('app.pages.errors.error-404', {
                url  : '/error-404',
                views: {
                    'app@'        : {
                        templateUrl: 'app/layout/basic.html'
                    },
                    'main@app.404': {
                        templateUrl: 'app/main/pages/error/error-404.html'
                    }
                }
            })

            // 500
            .state('app.pages.errors.error-500', {
                url  : '/error-500',
                views: {
                    'app@'        : {
                        templateUrl: 'app/layout/basic.html'
                    },
                    'main@app.500': {
                        templateUrl: 'app/main/pages/error/error-500.html'
                    }
                }
            })

            // Invoice
            .state('app.pages.invoice', {
                url  : '/invoice',
                views: {
                    'main@app': {
                        templateUrl: 'app/main/pages/invoice/invoice.html',
                        controller : 'invoiceController as vm'
                    }
                }
            })

            // Profile
            .state('app.pages.profile', {
                url  : '/profile',
                views: {
                    'main@app': {
                        templateUrl: 'app/main/pages/profile/profile.html',
                        controller : 'profileController as vm'
                    }
                }
            })

            // Search
            .state('app.pages.search', {
                url  : '/search',
                views: {
                    'main@app': {
                        templateUrl: 'app/main/pages/search/search.html',
                        controller : 'searchController as vm'
                    }
                }
            })

            // Timeline
            .state('app.pages.timeline', {
                url  : '/timeline',
                views: {
                    'main@app': {
                        templateUrl: 'app/main/pages/timeline/timeline.html',
                        controller : 'timelineController as vm'
                    }
                }
            })

        /**
         * User Interface
         */
            .state('app.ui', {
                abstract: true,
                url     : '/ui'
            })

            // Typography
            .state('app.ui.typography', {
                url  : '/typography',
                views: {
                    'main@app': {
                        templateUrl: 'app/main/typography/typography.html',
                        controller : 'typographyController as vm'
                    }
                }
            })

            // Colors
            .state('app.ui.colors', {
                url  : '/colors',
                views: {
                    'main@app': {
                        templateUrl: 'app/main/colors/colors.html',
                        controller : 'colorsController as vm'
                    }
                }

            })

            // Icons
            .state('app.ui.icons', {
                url  : '/icons',
                views: {
                    'main@app': {
                        templateUrl: 'app/main/icons/icons.html',
                        controller : 'iconsController as vm'
                    }
                }
            })

            // Layouts
            .state('app.ui.layouts', {
                url  : '/layouts',
                views: {
                    'main@app': {
                        templateUrl: 'app/main/layouts/layouts.html',
                        controller : 'layoutsController as vm'
                    }
                }
            })

        /**
         * Components
         */
            .state('app.components', {
                abstract: true,
                url     : '/components'
            })

        /**
         * Elements
         */
            .state('app.components.elements', {
                abstract: true,
                url     : '/elements'
            })

            // Buttons
            .state('app.components.elements.buttons', {
                url  : '/buttons',
                views: {
                    'main@app': {
                        templateUrl: 'app/main/elements/buttons/buttons.html',
                        controller : 'buttonsController as vm'
                    }
                }
            })

        /**
         * Tables
         */
            .state('app.components.tables', {
                abstract: true,
                url     : '/tables'
            })

            // Standard Table
            .state('app.components.tables.standart-table', {
                url  : '/standard-table',
                views: {
                    'main@app': {
                        templateUrl: 'app/main/tables/standart-table/standart-table.html',
                        controller : 'standartTableController as vm'
                    }
                }
            })

            // DataTable
            .state('app.components.tables.data-table', {
                url  : '/datatable',
                views: {
                    'main@app': {
                        templateUrl: 'app/main/tables/data-table/data-table.html',
                        controller : 'dataTableController as vm'
                    }
                }
            })

            // Price Tables
            .state('app.components.price-tables', {
                url  : '/price-tables',
                views: {
                    'main@app': {
                        templateUrl: 'app/main/pages/price-tables/price-tables.html',
                        controller : 'priceTablesController as vm'
                    }
                }
            })

            // Charts
            .state('app.components.charts', {
                url  : '/charts',
                views: {
                    'main@app': {
                        templateUrl: 'app/main/pages/charts/charts.html',
                        controller : 'chartsController as vm'
                    }
                }
            })

            // Maps
            .state('app.components.maps', {
                url  : '/maps',
                views: {
                    'main@app': {
                        templateUrl: 'app/main/pages/maps/maps.html',
                        controller : 'mapsController as vm'
                    }
                }
            })

            // Widgets
            .state('app.components.widgets', {
                url  : '/widgets',
                views: {
                    'main@app': {
                        templateUrl: 'app/main/pages/maps/maps.html',
                        controller : 'widgetsController as vm'
                    }
                }
            });

    }

})();
