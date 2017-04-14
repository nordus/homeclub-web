(function ()
{
    'use strict';

    angular
        .module( 'app.consumer.alerts', [] )
        .config( config );

    /** @ngInject */
    function config( $stateProvider )
    {
        // State
        $stateProvider
            .state('app.consumer_alerts', {
                url     : '/alerts?sensorHubMacAddress',
                views   : {
                    'content@app': {
                        templateUrl: 'app/consumer/alerts/alerts.html',
                        controller : 'AlertsController as vm'
                    }
                }
            });
    }
})();