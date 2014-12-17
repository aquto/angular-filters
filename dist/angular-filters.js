/**
 * Useful filters for AngularJS
 * @version v1.1.1 - 2014-12-17 * @link https://github.com/niemyjski/angular-filters
 * @author Blake Niemyjski <biemyjski@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */(function () {
    'use strict';

    angular.module('angular-filters', []);
}());

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

(function () {
    'use strict';

    angular.module('angular-filters')
        .filter('join', [function () {
            return function(input, separator) {
                if (!Array.isArray(input)){
                    return input;
                }

                var filtered = [];
                input.forEach(function (item) {
                    if (item){
                        filtered.push(item);
                    }
                });

                return filtered.join(separator || ',');
            };
        }]);
}());

(function () {
    'use strict';

    angular.module('angular-filters')
        .filter('replace', [function () {
            function isString(input) {
                return typeof input === 'string' || input instanceof String;
            }

            return function(input, searchValue, newValue) {
                if (!isString(input) || !isString(searchValue) || !isString(newValue))
                    return input;

                return input.split(searchValue).join(newValue);
            };
        }]);
}());

(function () {
    'use strict';

    angular.module('angular-filters')
        .filter('reverse', [function () {
            function reverseArray(items) {
                return items.slice().reverse();
            }

            function reverseString(input) {
                var result = '';
                for (var i = 0; i < input.length; i++) {
                    result = input.charAt(i) + result;
                }

                return result;
            }

            return function(input) {
                if (Array.isArray(input)){
                    return reverseArray(input);
                }

                if (typeof input === 'string' || input instanceof String) {
                    return reverseString(input);
                }

                return input;
            };
        }]);
}());

(function () {
    'use strict';

    angular.module('angular-filters')
        .filter('toSpacedWords', [function () {
            function toSpacedWords(input) {
                if (!input.match(/\d+|__/g)) {
                    input = input.replace(/([a-z])([A-Z])/g, '$1 $2');
                    input = input.length > 1 ? input.charAt(0).toUpperCase() + input.slice(1) : input;
                }

                return input;
            }

            return function(input) {
                if (!input) {
                  return input;
                }

                if (typeof input === 'string' || input instanceof String) {
                    return toSpacedWords(input);
                }

                return input;
            };
        }]);
}());
