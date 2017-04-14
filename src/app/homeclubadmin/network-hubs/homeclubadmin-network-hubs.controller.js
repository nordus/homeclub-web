(function ()
{
    'use strict';

    angular
        .module( 'app.homeclubadmin.network-hubs' )
        .controller( 'HomeClubAdminNetworkHubsController', HomeClubAdminNetworkHubsController );

    /** @ngInject */
    function HomeClubAdminNetworkHubsController( $state, $stateParams, customerAccounts, meta, networkHubs )
    {   
        var vm              = this;

        // Data
        vm.customerNames    = {};

        customerAccounts.forEach(function( c ) {
            this[ c._id ]   = formatName( c )
        }, vm.customerNames);

        vm.dtInstance       = {};

        vm.searchText       = $stateParams.search;
        
        vm.dtOptions        = {
            columnDefs  : [
                {
                    sortable    : false,
                    targets     : [ 3,4 ]
                }
            ],
            dom         : 'rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
            pagingType  : 'simple',
            pageLength  : 20,
            autoWidth   : true,
            scrollY     : 'auto',
            responsive  : true,
            initComplete: function () {
                var api = this.api(),
                searchBox = angular.element( 'body' ).find( '#network-hubs-search' );
                // Bind an external input as a table wide search box
                if ( searchBox.length > 0 ) {
                    searchBox.on('keyup', function ( event ) {
                        api.search( event.target.value ).draw();
                    });
                }

                if ( vm.searchText ) {
                    api.search( vm.searchText ).draw();
                }
            }
        };

        vm.msScrollOptions          = {
            suppressScrollX : true
        };

        vm.networkHubs      = networkHubs;

        // Methods
        vm.delete   = function( networkHub ) {
            if ( confirm( "Delete " + networkHub._id + "?" ) ) {
                return networkHub.$delete(function( deletedNetworkHub ) {
                    // return notifier.success("Network Hub " + networkHub._id + " deleted!");
                    console.log("Network Hub " + networkHub._id + " deleted!");
                });
            }
        };
        
        vm.getSensorHubType = function( sh ) {
            return sh.sensorHubType && meta.sensorHubTypes[ String( sh.sensorHubType ) ]
        }
        
        vm.save     = function( networkHub ) {
            var acct    = getCustomerAccountById( networkHub.customerAccount );
            
            if ( !Array.isArray( networkHub.sensorHubs ) ) {
                networkHub.sensorHubs = networkHub.sensorHubs.split( ',' );
            }
            
            return networkHub.$update(function( updatedNetworkHub ) {
                // return notifier.success( 'Saved!' );
                console.log( updatedNetworkHub );
                // $state.reload();
                acct.gateways[0]    = networkHub._id;

                acct.$update(function( updatedAcct ) {
                    console.log( updatedAcct );
                    $state.reload();
                })
            });
        };

        //////////
        function formatName( c ) {
            return [ c.name.first, c.name.last, '(..' + c._id.substr( -4 ) + ')'].join( ' ' );
        };

        function getCustomerAccountById( id ) {
            return customerAccounts.find(function( account ) {
                return account._id === id;
            })
        };
    }
})();
