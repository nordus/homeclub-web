
'use strict';

angular
    .module( 'app.consumer.alerts' )
    .controller( 'AlertsController', AlertsController );

/** @ngInject */
function AlertsController( $mdSidenav, $q, $scope, $stateParams, AlertFormatter, currentUser, dateFilter, msApi )
{   
    var macAddress              = currentUser.roles.customerAccount.gateways[0]._id;
    
    var vm                      = this;

    // Data
    vm.alertFormatter           = AlertFormatter;
    
    vm.currentUser              = currentUser;
    
    vm.msScrollOptions          = {
        suppressScrollX : true
    };
    
    vm.searchParams             = {
        eventTypes              : [],
        macAddress              : macAddress,
        sensorHubMacAddresses   : [],
        start                   : "'30 days ago'"
    };

    vm.searchParamsDefaults     = angular.copy( vm.searchParams );
    
    if ( $stateParams.sensorHubMacAddress ) {
        vm.searchParams.sensorHubMacAddresses.push( $stateParams.sensorHubMacAddress );
    }

    // vm.showAllTasks         = true;
    vm.showNetworkHubEvents     = true;
    
    checkFilters();

    vm.refreshAlerts            = function() {
        $q.all([
            msApi.request( 'sensorHubEvents@get', vm.searchParams ),
            msApi.request( 'networkHubEvents@get', vm.searchParams )
        ]).then(function( resp ) {
            var allEvents               = resp[ 0 ];
            
            // only networkHubEvents filter is selected, discard sensorHubEvents
            if ( !vm.showAllTasks && vm.showNetworkHubEvents && vm.searchParams.eventTypes.length == 0 ) {
                allEvents   = [];
            }
            
            if ( vm.showNetworkHubEvents ) {
                allEvents   = _.concat( allEvents, resp[ 1 ] );
            }
            
            vm.sensorHubEventsGrouped   = _.groupBy( allEvents, function( item ) {
                return dateFilter( item.timestamp, 'yyyy-MM-dd|MMMM d, yyyy' );
            });

            vm.sensorHubEventsDates     = Object.keys( vm.sensorHubEventsGrouped ).sort().reverse();
        });
    }

    $scope.$watchCollection( 'vm.searchParams', function( newSearchParams ) {
        vm.refreshAlerts();
    });

    // Methods
    vm.isEventTypeFilterExists  = function( eventType ) {
        return vm.searchParams.eventTypes.indexOf( eventType ) > -1;
    }
    
    vm.isTagFilterExists    = function( tag ) {
        return vm.searchParams.sensorHubMacAddresses.indexOf( tag ) > -1;
    }

    vm.resetFilters         = function() {
        vm.showNetworkHubEvents = true;
        vm.showAllTasks         = true;
        vm.searchParams         = angular.copy( vm.searchParamsDefaults );

        vm.refreshAlerts();
    }
    
    vm.toggleSidenav    = function( sidenavId ) {
        $mdSidenav( sidenavId ).toggle();
    };

    vm.toggleEventTypeFilter  = function ( eventType ) {
        var i = vm.searchParams.eventTypes.indexOf( eventType );

        if ( i > -1 )
        {
            vm.searchParams.eventTypes.splice( i, 1 );
        }
        else
        {
            vm.searchParams.eventTypes.push( eventType );
        }

        vm.refreshAlerts();

        checkFilters();
    };
    
    vm.toggleSensorHubFilter  = function ( tag ) {
        var i = vm.searchParams.sensorHubMacAddresses.indexOf( tag );

        if ( i > -1 )
        {
            vm.searchParams.sensorHubMacAddresses.splice( i, 1 );
        }
        else
        {
            vm.searchParams.sensorHubMacAddresses.push( tag );
        } 

        vm.refreshAlerts();

        if ( !(vm.showNetworkHubEvents && vm.searchParams.eventTypes.length == 0) ) { 
            checkFilters();
        }
    };
    
    vm.toggleNetworkHubEvents   = function() {
        if ( !(vm.showNetworkHubEvents && vm.showAllTasks) ) {
            vm.showNetworkHubEvents = !vm.showNetworkHubEvents;
        }
        
        vm.showAllTasks         = false;
        
        vm.refreshAlerts();
        
        if ( !(vm.showNetworkHubEvents && vm.searchParams.eventTypes.length == 0) ) { 
            checkFilters();
        }
    }

    //////////
    function checkFilters() {
        vm.showAllTasks = !!angular.equals( vm.searchParamsDefaults, vm.searchParams );
        
        if ( vm.showAllTasks )  vm.showNetworkHubEvents = true;
    };
}