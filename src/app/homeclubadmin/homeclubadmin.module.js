(function ()
{
    'use strict';

    angular
        .module('app.homeclubadmin',
            [
                'app.homeclubadmin.carrier-admins',
                'app.homeclubadmin.carriers',
                'app.homeclubadmin.connectivity',
                'app.homeclubadmin.customer-accounts',
                'app.homeclubadmin.dashboard',
                'app.homeclubadmin.import',
                'app.homeclubadmin.network-hubs',
                'app.homeclubadmin.users',
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
                    
                    if ( currentUser.roles.homeClubAdmin ) {
                        shouldHide  = false;
                    }

                    function isHidden() {
                        return shouldHide;
                    }

                    msNavigationService.saveItem('homeclubadmin', {
                        title   : 'HOMECLUB ADMIN',
                        group   : true,
                        hidden  : isHidden
                    });
                    
                    msNavigationService.saveItem('homeclubadmin.carrier_admins', {
                        title : 'Admins',
                        icon  : 'icon-star-outline',
                        state : 'app.homeclubadmin_carrier_admins'
                    });
            
                    msNavigationService.saveItem('homeclubadmin.carriers', {
                        title : 'Carriers',
                        icon  : 'icon-umbrella',
                        state : 'app.homeclubadmin_carriers'
                    });
            
                    msNavigationService.saveItem('homeclubadmin.connectivity', {
                        title : 'Connectivity',
                        icon  : 'icon-pulse',
                        state : 'app.homeclubadmin_connectivity'
                    });
            
                    msNavigationService.saveItem('homeclubadmin.customer_accounts', {
                        title : 'Customer Accounts',
                        icon  : 'icon-account',
                        state : 'app.homeclubadmin_customer_accounts'
                    });
                    
                    msNavigationService.saveItem('homeclubadmin.dashboard', {
                        title : 'Dashboard',
                        icon  : 'icon-tile-four',
                        state : 'app.homeclubadmin_dashboard'
                    });
            
                    msNavigationService.saveItem('homeclubadmin.network_hubs', {
                        title : 'HomeClub Hubs',
                        icon  : 'icon-nest-protect',
                        state : 'app.homeclubadmin_network_hubs'
                    });
            
                    msNavigationService.saveItem('homeclubadmin.import', {
                        title : 'Import',
                        icon  : 'icon-account-multiple-plus',
                        state : 'app.homeclubadmin_import'
                    });
            
                    msNavigationService.saveItem('homeclubadmin.users', {
                        title : 'Users',
                        icon  : 'icon-at',
                        state : 'app.homeclubadmin_users'
                    });
                })
            }
        })
    }

    /** @ngInject */
    function config( API_URL, msApiProvider )
    {

        // API
        var methodOverrides = {
            get     : { isArray : true },
            update  : { method : 'PUT' }
        };
        
        var paramDefaults   = {
            id      : '@_id'
        };


        msApiProvider.setBaseUrl( '/' );

        msApiProvider.register( 'meta', ['app/data/shared/meta.json'] );
        
        msApiProvider.register( 'provinces', [ 'app/data/shared/provinces.json', {}, { get : methodOverrides.get } ] );


        msApiProvider.setBaseUrl( API_URL );
        
        msApiProvider.register( 'carriers', [ '/carriers/:id', paramDefaults, methodOverrides]);
        
        msApiProvider.register( 'carrierAdmins', [ '/carrier-admins/:id', paramDefaults, methodOverrides]);

        msApiProvider.register( 'customerAccounts', [ '/customer-accounts/:id', paramDefaults, methodOverrides]);
        
        // TODO: this is also used by carrieradmin module.  
        // should this and other API endpoint registrations be moved to a shared
        // module?
        msApiProvider.register( 'histograms', [ '/histograms' ] );
        
        msApiProvider.register( 'homeclubAdmins', [ '/homeclub-admins/:id', paramDefaults, methodOverrides]);

        msApiProvider.register( 'networkHubs', [ '/network-hubs/:id', paramDefaults, methodOverrides]);

        msApiProvider.register( 'sensorHubs', [ '/sensor-hubs', {}, { get : methodOverrides.get } ]);
        
        msApiProvider.register( 'users', [ '/users/:id', paramDefaults, methodOverrides]);
    }

})();