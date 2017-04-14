
angular
    .module( 'app.consumer' )
    .factory( 'AlertFormatter', AlertFormatter );


/** @ngInject */
function AlertFormatter() {
  return {
    text: function( event ) {
        var alertText, eventDate, eventResolved, eventType;
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
        return alertText;
    },

    iconAndColor: function( event ) {
        var icon, eventDate, eventResolved, eventType;
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
        return icon;
    }
  }
}