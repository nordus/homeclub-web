
'use strict';

angular
    .module( 'app.consumer.alerts' )
    .controller( 'AlertsController', AlertsController );

/** @ngInject */
function AlertsController( $mdSidenav, $scope, $stateParams, AlertFormatter, currentUser, dateFilter, msApi )
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
    checkFilters();

    vm.refreshAlerts            = function() {
        msApi.request( 'sensorHubEvents@get', vm.searchParams ).then(function( resp ) {
            vm.sensorHubEventsGrouped   = _.groupBy( resp, function( item ) {
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
        vm.showAllTasks = true;
        vm.searchParams = angular.copy( vm.searchParamsDefaults );

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

        checkFilters();
    };

    //////////
    function checkFilters() {
        vm.showAllTasks = !!angular.equals( vm.searchParamsDefaults, vm.searchParams );
    };
}