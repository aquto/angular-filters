(function () {
    'use strict';

    angular.module('angular-filters')
        .filter('bytes', [function () {
            return function(bytes, args) {

                var precision;
                var minUnit;
                var maxDisplay = 1023;
                var units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                if (typeof args === 'undefined') {
                    precision = 1;
                }
                else if (typeof args === 'object') {
                    precision = (typeof args.precision === 'undefined') ? 1 : args.precision;
                    minUnit = args.minUnit;
                    maxDisplay = args.maxDisplay || maxDisplay;
                }
                else {
                    precision = args;
                }

                if (bytes === 0 && minUnit && units.indexOf(minUnit) > -1) {
                    return '0 '+minUnit;
                }
                else if (bytes === 0) {
                    return '0 B';
                }

                if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) {
                    return '-';
                }

                var isNegative = bytes < 0;
                if (isNegative) {
                    bytes = -bytes;
                }

                var exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1) -1;
                var number = (bytes / Math.pow(1024, Math.floor(exponent)));
                if (number > maxDisplay) {
                    exponent = exponent + 1;
                    number = (bytes / Math.pow(1024, Math.floor(exponent)));   
                }
                number = number.toFixed(precision);
                var belowMin = false;

                if (minUnit && units.indexOf(minUnit) > -1 && exponent < units.indexOf(minUnit)) {
                    number = 1;
                    exponent = units.indexOf(minUnit);
                    belowMin = true;
                }

                return (belowMin ? '< ' : '') + (isNegative ? '-' : '') +  number +  ' ' + units[exponent];
            };
        }]);
}());
