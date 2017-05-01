(function ()
{
    'use strict';

    angular
        .module('app.consumer.sample', [])
        .config(config);

    /** @ngInject */
    function config( $stateProvider )
    {
        // State
        $stateProvider
            .state('app.consumer_sample', {
                url    : '/sample',
                views  : {
                    'content@app': {
                        templateUrl: 'app/consumer/sample/sample.html',
                        controller : 'SampleController as vm'
                    }
                },
                resolve : {
                    meta        : function( msApi )
                    {
                        return msApi.resolve( 'meta@get' );
                    },
                    networkHub  : function( msApi )
                    {
                        return msApi.resolve( 'networkHub@get' );
                    },
                    sensorHubs  : function( msApi )
                    {
                        return msApi.resolve( 'consumerSensorHubs@get' );
                    }
                }
            });
    }
})();