(function () {
    'use strict';

    angular.module('angular-filters')
        .filter('bytes', [function () {
            return function(bytes, args) {
                if (bytes === 0) {
                    return '0 B';
                }

                if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) {
                    return '-';
                }

                var isNegative = bytes < 0;
                if (isNegative) {
                    bytes = -bytes;
                }
                var precision;
                var minUnit;
                if (typeof args === 'undefined') {
                    precision = 1;
                }
                else if (typeof args === 'object') {
                    precision = args.precision;
                    minUnit = args.minUnit;
                }
                else {
                    precision = args;
                }

                var units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                var exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
                var number = (bytes / Math.pow(1024, Math.floor(exponent))).toFixed(precision);
                var fuzzy = false;

                if (minUnit && units.indexOf(minUnit) > -1 && exponent < units.indexOf(minUnit)) {
                    number = 1;
                    exponent = units.indexOf(minUnit);
                    fuzzy = true;
                }

                return (fuzzy ? '< ' : '') + (isNegative ? '-' : '') +  number +  ' ' + units[exponent];
            };
        }]);
}());
