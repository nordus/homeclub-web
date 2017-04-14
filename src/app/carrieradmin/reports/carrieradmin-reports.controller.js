(function ()
{
    'use strict';

    angular
        .module( 'app.carrieradmin.reports' )
        .controller( 'CarrierAdminReportsController', CarrierAdminReportsController );

    /** @ngInject */
    function CarrierAdminReportsController( $http, API_URL, BuildUrl, token )
    {   
        var vm          = this;

        // Data
        vm.reportParams = {
            end     : new Date()
        };

        // Methods
        vm.download     = function( msgType ) {
            var url = vm.downloadUrlByMsgType( msgType );
            
            $http.get( url ).then(function( resp ) {
                console.log( resp );
                var blob            = new Blob([resp.data], { type : "text/csv;charset=utf-8;" });
                var downloadLink    = angular.element( '<a></a>' );
                downloadLink.attr( 'href', window.URL.createObjectURL( blob ) );
                downloadLink.attr( 'download', 'report.csv' );
			    downloadLink[ 0 ].click();
            })
        }

        vm.downloadUrlByMsgType = function( msgType ) {
            var params, ref;
            params = angular.extend({}, vm.reportParams, {
                download    : true,
                end         : vm.reportParams.end.toDateString() + ' 23:59:59 -1200',
                msgType     : msgType,
                start       : (ref = vm.reportParams.start) != null ? ref.toDateString() : void 0
            });
            return BuildUrl( API_URL + '/search', params );
        };

        //////////
    }
})();
