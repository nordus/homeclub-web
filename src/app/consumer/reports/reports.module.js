(function ()
{
    'use strict';

    angular
        .module('app.consumer.reports', ['highcharts-ng'])
        .config(config);

    /** @ngInject */
    function config( $stateProvider )
    {
        // State
        $stateProvider
            .state('app.consumer_reports', {
                url    : '/reports',
                views  : {
                    'content@app': {
                        templateUrl: 'app/consumer/reports/reports.html',
                        controller : 'ReportsController as vm'
                    }
                }
            });
    }
})();