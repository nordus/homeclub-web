(function ()
{
    'use strict';

    angular
        .module( 'app.consumer.sample' )
        .controller( 'AlertSetupDialogController', AlertSetupDialogController );

    /** @ngInject */
    function AlertSetupDialogController( $mdDialog, $state, meta, msApi, sensorHub )
    {
        var vm = this;

        // Data
        var sensorTypesBySensorHubTypeId = {
            '1' : ['temperature', 'water'],
            '2' : ['humidity', 'light', 'temperature'],
            '3' : ['movement'],
            '4' : ['motion']
        };

        vm.deliveryMethods  = [ 'email', 'sms' ];
        vm.forms            = {};
        vm.meta             = meta;
        vm.sensorHub        = angular.copy( sensorHub );
        vm.sensorTypes      = [ 'humidity', 'light', 'motion', 'movement', 'temperature', 'water' ];
        vm.title            = 'Email / SMS alerts';

        // Methods
        vm.closeDialog      = function() {
            $mdDialog.hide();
        }

        vm.getDeliveryMethodIcon    = function( deliveryMethod ) {
            return {
                email   : 'icon-at',
                sms     : 'icon-cellphone-android'
            }[ deliveryMethod ]
        };
        
        vm.hasSensorType    = function( sensorHub, sensorType ) {
            var sensorTypesOfCurrentSensorHub = sensorHub && sensorTypesBySensorHubTypeId[ sensorHub.sensorHubType ] || [];
            return sensorTypesOfCurrentSensorHub.indexOf( sensorType ) >= 0;
        }

        vm.isChecked = function( sensorHub, value, deliveryMethod ) {
            var checkedNotifications, indexOfValue, notificationName;
            notificationName = deliveryMethod + "Subscriptions";
            checkedNotifications = sensorHub[ notificationName ];
            indexOfValue = checkedNotifications.indexOf( value );
            return indexOfValue !== -1;
        };

        vm.saveAlertSetup   = function() {
            msApi.request( 'consumerSensorHubs@update', vm.sensorHub ).then(function( resp ) {
                $state.reload();
            })
        }

        vm.toggleSubscription = function( sensorHub, deliveryMethod, sensorType ) {
            var subscriptions = sensorHub[deliveryMethod + "Subscriptions"];

            if ( subscriptions.indexOf( sensorType ) >= 0 ) {
                subscriptions.splice(subscriptions.indexOf(sensorType), 1);
            } else {
                subscriptions.push(sensorType);
            }
            
            return vm.forms[ vm.sensorHub._id ].$setDirty();
        };

    }
})();