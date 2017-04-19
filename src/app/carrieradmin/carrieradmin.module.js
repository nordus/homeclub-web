(function ()
{
    'use strict';

    angular
        .module('app.carrieradmin',
            [
                'app.carrieradmin.carrierAdmins',
                'app.carrieradmin.connectivity',
                'app.carrieradmin.customer-accounts',
                'app.carrieradmin.dashboard',
                'app.carrieradmin.reports'
            ]
        )
        .config( config )
        .run( runBlock );

    /** @ngInject */
    function runBlock( msNavigationService, $firebaseAuth, jwtHelper ) {

        $firebaseAuth().$onAuthStateChanged(function( user ) {
            if ( user ) {
                user.getToken().then(function( token ) {

                            var currentUser = jwtHelper.decodeToken( token );
                            
                            var shouldHide  = true;
                            
                            if ( currentUser.roles.carrierAdmin ) {
                                shouldHide  = false;
                            }

                            function isHidden() {
                                return shouldHide;
                            }

                            msNavigationService.saveItem('carrieradmin', {
                                title   : 'CARRIER ADMIN',
                                group   : true,
                                weight  : 1,
                                hidden  : isHidden
                            });

                            msNavigationService.saveItem('carrieradmin.carrierAdmins', {
                                title : 'Admins',
                                icon  : 'icon-account-key',
                                state : 'app.carrieradmin_carrier_admins',
                                weight: 1
                            });

                            msNavigationService.saveItem('carrieradmin.customer-accounts', {
                                title : 'Accounts',
                                icon  : 'icon-account',
                                state : 'app.carrieradmin_customer_accounts',
                                weight: 1
                            });
                            
                            msNavigationService.saveItem('carrieradmin.connectivity', {
                                title : 'Connectivity',
                                icon  : 'icon-pulse',
                                state : 'app.carrieradmin_connectivity',
                                weight: 1
                            });
                            
                            msNavigationService.saveItem('carrieradmin.dashboard', {
                                title : 'Dashboard',
                                icon  : 'icon-tile-four',
                                state : 'app.carrieradmin_dashboard',
                                weight: 0
                            });

                            msNavigationService.saveItem('carrieradmin.reports', {
                                title : 'Reports',
                                icon  : 'icon-spreadsheet',
                                state : 'app.carrieradmin_reports',
                                weight: 1
                            });
                })
            }
        })
    }
    // end runBlock


    /** @ngInject */
    function config( API_URL, msApiProvider )
    {
        // Api
        var methodOverrides = {
            get     : { isArray : true },
            update  : { method : 'PUT' }
        };
        
        var defaultParams  = {
            id      : '@_id'
        };

        msApiProvider.setBaseUrl( API_URL );
        
        msApiProvider.register( 'carrierAdminCarrierAdmins', [ '/carrier-admins/:id', defaultParams, methodOverrides]);
    }

})();