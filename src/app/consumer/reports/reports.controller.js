
'use strict';

angular
    .module( 'app.consumer.reports' )
    .controller( 'ReportsController', ReportsController );

/** @ngInject */
function ReportsController( $filter, $scope, currentUser, msApi )
{   
    var vm                      = this;

    var sensorHubMacAddresses   = Object.keys( currentUser.sensorHubNames );

    // Data
    vm.searchParams = {
        interval                : 'hour',
        sensorHubMacAddresses   : sensorHubMacAddresses,
        start			        : '1 day ago'
    };
    
    // msApi.request( 'chartData@get', vm.searchParams).then(function( resp ) {
    //     vm.chartData    = resp;
    // });

    // Methods
    vm.replaceChartData = function(start) {
        if (start === '1 month ago' || start === '6 months ago') {
            vm.searchParams.interval = 'day';
        } else {
            vm.searchParams.interval = 'hour';
        }

        msApi.request( 'chartData@get', vm.searchParams).then(function( resp ) {
            vm.chartData    = resp;
        });
    };

    $scope.$watch( 'vm.searchParams.start', function (newValue) {
        vm.replaceChartData( newValue );
    });

    //////////
    Highcharts.setOptions({
        global  : {
            useUTC: false
        },
        tooltip : {
            formatter   : function() {
                return [$filter('date')(this.x, 'MMM dd, h:mma'), "<span style=\"color:" + this.points[0].series.color + "\">- " + this.points[0].series.name + "</span>: <b>" + (this.y.toFixed(1)) + this.points[0].series.tooltipOptions.valueSuffix + "</b>", "<span style=\"color:" + this.points[1].series.color + "\">\u25A0 " + this.points[1].series.name + "</span>: <b>" + (this.points[1].point.low.toFixed(1)) + this.points[0].series.tooltipOptions.valueSuffix + " - " + (this.points[1].point.high.toFixed(1)) + this.points[0].series.tooltipOptions.valueSuffix + "</b>"].join('<br/>');
            },
            shared      : true
        }
    });
}