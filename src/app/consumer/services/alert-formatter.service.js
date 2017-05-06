
angular
    .module( 'app.consumer' )
    .factory( 'AlertFormatter', AlertFormatter );


/** @ngInject */
function AlertFormatter() {
  return {
    text: function( event ) {
        var alertText, eventDate, eventResolved, eventType;
        
        if ( event.sensorHubMacAddress ) {
            eventResolved = event.sensorEventEnd !== 0;
            if (eventResolved) {
                eventType = event.sensorEventEnd;
            } else {
                eventType = event.sensorEventStart;
            }
            alertText = (function() {
                switch (eventType) {
                case 1:
                    return 'Water detect';
                case 2:
                    return 'Motion detect';
                case 3:
                    return 'Low temperature';
                case 4:
                    return 'High temperature';
                case 5:
                    return 'Low humidity';
                case 6:
                    return 'High humidity';
                case 7:
                    return 'Low light';
                case 8:
                    return 'High light';
                case 9:
                    return 'Movement';
                }
            })();
            if (eventResolved) {
                alertText += ' resolved';
            }
        }
        
        if ( event.gatewayEventCode ) {
            alertText = (function() {
                switch ( event.gatewayEventCode ) {
                case 1:
                    return 'Going from line power to backup battery';
                case 2:
                    return 'Going from backup battery to line power';
                }
            })();
        }
        
        return alertText;
    },

    iconAndColor: function( event ) {
        var icon, eventDate, eventResolved, eventType;
        
        if ( event.sensorHubMacAddress ) {
            eventResolved = event.sensorEventEnd !== 0;
            if (eventResolved) {
                eventType = event.sensorEventEnd;
            } else {
                eventType = event.sensorEventStart;
            }
            icon = (function() {
                switch (eventType) {
                case 1:
                    return ['icon-water', '#0091EA'];
                case 2:
                    return ['icon-eye', '#9C27B0'];
                case 3:
                    return ['icon-thermometer', '#F44336'];
                case 4:
                    return ['icon-thermometer', '#F44336'];
                case 5:
                    return ['icon-weather-hail','inherit'];
                case 6:
                    return ['icon-weather-hail','inherit'];
                case 7:
                    return ['icon-white-balance-sunny', '#FFB300'];
                case 8:
                    return ['icon-white-balance-sunny', '#FFB300'];
                case 9:
                    return ['icon-reply-all', '#388E3C'];
                }
            })();
        }
        
        if ( event.gatewayEventCode ) {
            icon = (function() {
                switch ( event.gatewayEventCode ) {
                case 1:
                    return ['icon-alert', '#ff9800'];
                case 2:
                    return ['icon-alert', '#ff9800'];
                }
            })();
        }
        
        return icon;
    }
  }
}