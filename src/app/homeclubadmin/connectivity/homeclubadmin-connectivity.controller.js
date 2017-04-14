(function ()
{
    'use strict';

    angular
        .module( 'app.homeclubadmin.connectivity' )
        .controller( 'HomeClubAdminConnectivityController', HomeClubAdminConnectivityController );

    /** @ngInject */
    function HomeClubAdminConnectivityController( $filter, histograms, meta, sensorHubs )
    {   
        var vm          = this;

        // Data        
        vm.histogramOptions = {
          renderer  : 'bar',
          height    : 20,
          width     : 150
        };
        
        vm.histogramFeatures = {
          hover: {
            formatter: function( series, x, y ) {
              var formattedDate = $filter('date')(x * 1000, 'MMM dd, h:mma');
              var date = "<span class='date'>" + formattedDate + "</span>";
              return (parseInt(y)) + " messages<br>" + date;
            }
          }
        };

        vm.histograms       = histograms;
        
        vm.sensorHubs       = sensorHubs;

        // Methods
        vm.sensorHubType    = function( sensorHubMac ) {
          var sensorHub = vm.sensorHubs.filter(function( sh ) {
            return sh._id === sensorHubMac;
          }).pop();
          
          return meta.sensorHubTypes[ sensorHub.sensorHubType ];
        };

        //////////
    }
})();
