'use strict';

function classes() {
    var value = arguments[0];
    while (typeof value === 'function') {
        value = value();
    }
    if (typeof value === 'object' && value !== null) {
        if (isIterable(value)) {
            var values = value;
            value = '';
            for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
                var subValue = values_1[_i];
                subValue = classes(subValue);
                if (subValue) {
                    value += (value ? ' ' : '') + subValue;
                }
            }
        }
        else {
            var values = value;
            value = '';
            for (var key in values) {
                var subValue = values[key];
                while (typeof subValue === 'function') {
                    subValue = subValue();
                }
                if (subValue) {
                    value += (value ? ' ' : '') + key;
                }
            }
        }
    }
    else if (typeof value !== 'string') {
        value = '';
    }
    for (var i = 1; i < arguments.length; i++) {
        var subValue = classes(arguments[i]);
        if (subValue) {
            value += (value ? ' ' : '') + subValue;
        }
    }
    return value;
}
function isIterable(value) {
    return 'Symbol' in window ? Symbol.iterator in value : Array.isArray(value);
}
classes.isIterable = isIterable;

module.exports = classes;
