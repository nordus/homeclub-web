(function ()
{
    'use strict';

    angular
        .module( 'app.core' )
        .filter( 'formatTemperature', formatTemperature );

    var degreesSymbol = '\u00B0';

    function convertCelsiusToFahrenheit(value) {
        return Math.round(value * 9.0 / 5.0 + 32);
    }

    function convertFahrenheitToCelsius(value) {
        return Math.round((value - 32) * 5.0 / 9.0);
    }

    function addDegreesSymbol(value) {
        return value += degreesSymbol;
    }

    function formatTemperature() {
        return function (input, scale, label) {
            var value = parseInt(input, 10),
                convertedValue;

            if (isNaN(value)) throw new Error('Input is not a number');

            if (scale === 'F') {
                convertedValue = convertCelsiusToFahrenheit(value);
            } else if (scale === 'C') {
                convertedValue = convertFahrenheitToCelsius(value);
            } else {
                throw new Error('Not a valid scale');
            }

            return label ? addDegreesSymbol(convertedValue) : convertedValue;
        };
    }

})();