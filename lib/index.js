'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function classes() {
    var e_1, _a;
    var value = arguments[0];
    while (typeof value === 'function') {
        value = value();
    }
    if (typeof value === 'object' && value !== null) {
        if (isIterable(value)) {
            var values = value;
            value = '';
            try {
                for (var values_1 = __values(values), values_1_1 = values_1.next(); !values_1_1.done; values_1_1 = values_1.next()) {
                    var subValue = values_1_1.value;
                    subValue = classes(subValue);
                    if (subValue) {
                        value += (value ? ' ' : '') + subValue;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (values_1_1 && !values_1_1.done && (_a = values_1.return)) _a.call(values_1);
                }
                finally { if (e_1) throw e_1.error; }
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
    return typeof Symbol === 'undefined' ? Array.isArray(value) : Symbol.iterator in value;
}
classes.isIterable = isIterable;

module.exports = classes;
