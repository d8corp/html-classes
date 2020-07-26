'use strict';

function classes(value) {
    var valueType;
    while ((valueType = typeof value) === 'function') {
        value = value();
    }
    if (valueType === 'object' && value !== null) {
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
    else if (valueType !== 'string') {
        return '';
    }
    return value;
}
function htmlClasses() {
    var value = '';
    for (var i = 0; i < arguments.length; i++) {
        var subValue = classes(arguments[i]);
        if (subValue) {
            value += (value ? ' ' : '') + subValue;
        }
    }
    return value;
}
var isIterable = typeof Symbol === 'undefined' ? function (value) { return Array.isArray(value); } : function (value) { return Symbol.iterator in value; };
htmlClasses.isIterable = isIterable;
htmlClasses.classes = classes;

module.exports = htmlClasses;
