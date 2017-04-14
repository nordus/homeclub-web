(function ()
{
    'use strict';

    angular
        .module('app.consumer.sample')
        .controller('SampleController', SampleController);

    /** @ngInject */
    function SampleController( $document, $firebaseObject, $http, $mdDialog, $mdToast, $state, AlertFormatter, currentUser, meta, msApi, sensorHubs )
    {   
        var macAddress  = currentUser.roles.customerAccount.gateways[ 0 ]._id;
        var latestRef   = firebase.database().ref().child( macAddress );
        var vm          = this;
        
        if ( currentUser.roles.customerAccount.country === 'CA' ) {
            var weatherURL  = 'https://api.wunderground.com/api/ac02af3b799f05ef/conditions/q/Canada/' + encodeURIComponent( currentUser.roles.customerAccount.city ) + '.json' + '?callback=JSON_CALLBACK';

        } else {
            var weatherURL  = 'https://api.wunderground.com/api/ac02af3b799f05ef/conditions/q/' + currentUser.roles.customerAccount.state + '/' + encodeURIComponent( currentUser.roles.customerAccount.city ) + '.json' + '?callback=JSON_CALLBACK';
        }


        // Data
        vm.alertFormatter   = AlertFormatter;
        vm.currentUser      = currentUser;
        vm.firstName        = currentUser.roles.customerAccount.name.first;
        vm.forms            = {};
        vm.latest           = $firebaseObject( latestRef );
        vm.macAddress       = macAddress;
        vm.meta             = meta;
        vm.sensorHubs       = sensorHubs;


        // Methods
        // TODO: make this 24 hours
        vm.alertInLast12Hrs = function( sensorHub ) {
            var msIn12Hrs, timeSince;
            if (!(sensorHub && sensorHub.latestAlert)) {
                return;
            }
            msIn12Hrs = 43200 * 1000;
            // TODO: hack
            msIn12Hrs = msIn12Hrs * 2;
            timeSince = (new Date().getTime()) - sensorHub.latestAlert.updateTime;
            return timeSince <= msIn12Hrs;
        };

        vm.cssClassByRssiThreshold = function( rssi ) {
            var rssiNum;
            if ( rssi === void 0 ) {
                return '';
            }
            rssiNum = Number( rssi );
            switch ( false ) {
                case !( rssiNum < -95 ):
                return 'error';
                case !( rssiNum < -80 ):
                return 'warn';
                default:
                return 'normal';
            }
        };
        
        vm.getSensorHubById = function( id ) {
            return vm.sensorHubs.find(function( sh ) {
                return sh._id === id;
            })
        }

        vm.openAlertSetupDialog = function( ev, sensorHub ) {
            $mdDialog.show({
                controller         : 'AlertSetupDialogController',
                controllerAs       : 'vm',
                templateUrl        : 'app/consumer/sample/dialogs/alert-setup/alert-setup-dialog.html',
                parent             : angular.element( $document.find( '#content-container' ) ),
                targetEvent        : ev,
                clickOutsideToClose: true,
                locals             : {
                    meta        : meta,
                    sensorHub   : sensorHub
                }
            });
        };

        // console.log( Auth );
        
        vm.save                 = function ( sensorHub ) {
            msApi.request( 'consumerSensorHubs@update', sensorHub ).then(function( resp ) {
                
                var message = 'Room names will be updated next time you log in.';

                $state.reload().then(function() {
                
                    $mdToast.show({
                        template : '<md-toast id="language-message" layout="column" layout-align="center start"><div class="md-toast-content">' + message + '</div></md-toast>',
                        hideDelay: 7000,
                        position : 'top right',
                        parent   : '#content'
                    });  

                })

            });
        }

        //////////
        $http.jsonp( weatherURL, {} ).then(function( resp ) {
            vm.weather  = resp.data.current_observation;
        });
    }
})();
