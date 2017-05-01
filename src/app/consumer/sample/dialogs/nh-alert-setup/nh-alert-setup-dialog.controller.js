(function ()
{
    'use strict';

    angular
        .module( 'app.consumer.sample' )
        .controller( 'NhAlertSetupDialogController', NhAlertSetupDialogController );

    /** @ngInject */
    function NhAlertSetupDialogController( $mdDialog, $state, msApi, networkHub )
    {
        var vm = this;

        vm.deliveryMethods  = [ 'email', 'sms' ];
        vm.forms            = {};
        vm.networkHub       = angular.copy( networkHub );

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

        vm.isChecked = function( value, deliveryMethod ) {
            var checkedNotifications, indexOfValue, notificationName;
            notificationName = deliveryMethod + "Subscriptions";
            checkedNotifications = vm.networkHub[ notificationName ];
            indexOfValue = checkedNotifications.indexOf( value );
            return indexOfValue !== -1;
        };

        vm.saveAlertSetup   = function() {
            msApi.request( 'networkHubs@update', vm.networkHub ).then(function( resp ) {
                $state.reload();
            })
        }

        vm.toggleSubscription = function( deliveryMethod, sensorType ) {
            
            var subscriptions = vm.networkHub[ deliveryMethod + "Subscriptions" ];

            if ( subscriptions.indexOf( sensorType ) >= 0 ) {
                subscriptions.splice( subscriptions.indexOf( sensorType ), 1 );
            } else {
                subscriptions.push( sensorType );
            }
            
            return vm.forms[ 'nhAlerts' ].$setDirty();
        };

    }
})();