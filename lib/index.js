'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isIterable = typeof Symbol === 'undefined'
    ? function (value) { return Array.isArray(value); }
    : function (value) { return Symbol.iterator in value; };
function classes(value) {
    if (typeof value === 'string') {
        return value;
    }
    if (typeof value === 'object' && value !== null) {
        var result = '';
        if (isIterable(value)) {
            for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                var subValue = value_1[_i];
                subValue = classes(subValue);
                if (subValue) {
                    result += (result ? ' ' : '') + subValue;
                }
            }
        }
        else {
            for (var key in value) {
                var subValue = value[key];
                while (typeof subValue === 'function') {
                    subValue = subValue();
                }
                if (subValue) {
                    result += (result ? ' ' : '') + key;
                }
            }
        }
        return result;
    }
    if (value instanceof Function) {
        return classes(value());
    }
    return '';
}
classes.isIterable = isIterable;

exports.classes = classes;
exports["default"] = classes;
exports.isIterable = isIterable;
