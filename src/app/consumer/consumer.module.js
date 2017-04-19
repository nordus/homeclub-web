(function ()
{
    'use strict';

    angular
        .module('app.consumer',
            [
                'app.consumer.account',
                'app.consumer.alerts',
                'app.consumer.reports',
                'app.consumer.sample'
            ]
        )
        .config(config)
        .run( runBlock );

    /** @ngInject */
    function runBlock( msNavigationService, $firebaseAuth, jwtHelper ) {
        
        $firebaseAuth().$onAuthStateChanged(function( user ) {
            if ( user ) {
                user.getToken().then(function( token ) {

                            var currentUser = jwtHelper.decodeToken( token );
                            
                            var shouldHide  = true;
                            
                            if ( currentUser.roles.customerAccount ) {
                                shouldHide  = false;
                            }

                            function isHidden() {
                                return shouldHide;
                            }

                            // Navigation
                            msNavigationService.saveItem('account', {
                                title    : 'Account',
                                icon     : 'icon-account',
                                state    : 'app.consumer_account',
                                hidden   : isHidden
                            });
                    
                            msNavigationService.saveItem('alerts', {
                                title    : 'Alerts',
                                icon     : 'icon-alert',
                                state    : 'app.consumer_alerts',
                                hidden   : isHidden
                            });
                    
                            msNavigationService.saveItem('reports', {
                                title    : 'Reports',
                                icon     : 'icon-chart-areaspline',
                                state    : 'app.consumer_reports',
                                hidden   : isHidden
                            });
                            
                            msNavigationService.saveItem('dashboard', {
                                title    : 'Dashboard',
                                icon     : 'icon-tile-four',
                                state    : 'app.consumer_sample',
                                weight   : 0,
                                hidden   : isHidden
                            });
                        })
                    }
                })       
    };


    /** @ngInject */
    function config( API_URL, msApiProvider )
    {
        // Api
        var methodOverrides = {
            get     : { isArray : true },
            update  : { method : 'PUT' }
        };
        
        var paramDefaults   = {
            id      : '@_id'
        };

        msApiProvider.setBaseUrl( '/' );

        msApiProvider.register( 'meta', [ 'app/data/shared/meta.json' ] );
        
        msApiProvider.register( 'provinces', [ 'app/data/shared/provinces.json', {}, { get : methodOverrides.get } ] );

        msApiProvider.setBaseUrl( API_URL );

        msApiProvider.register( 'customerAccount', [ '/me/customer-account' ]);

        var chartDataParamDefaults   = {
            interval    : 'hour',
            start       : '1 day ago'
        }
        
        msApiProvider.register( 'chartData', [ '/chartdata', chartDataParamDefaults ] );
        
        msApiProvider.register( 'networkHubEvents', [ '/search', { limit: 10000, msgType: 2, start: "'30 days ago'" }, { get : methodOverrides.get } ]);
        
        msApiProvider.register( 'sensorHubEvents', [ '/search', { limit: 10000, msgType: 4, start: "'30 days ago'" }, { get : methodOverrides.get } ]);

        msApiProvider.register( 'consumerSensorHubs', [ '/sensor-hubs/:id', paramDefaults, methodOverrides ]);
        
        msApiProvider.register( 'user', [ '/users/:id', paramDefaults, { update : methodOverrides.update }]);
    }

})();