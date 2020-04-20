function classes() {
    let value = arguments[0];
    let valueType;
    while ((valueType = typeof value) === 'function') {
        value = value();
    }
    if (valueType === 'object' && value !== null) {
        if (isIterable(value)) {
            const values = value;
            value = '';
            for (let subValue of values) {
                subValue = classes(subValue);
                if (subValue) {
                    value += (value ? ' ' : '') + subValue;
                }
            }
        }
        else {
            const values = value;
            value = '';
            for (const key in values) {
                let subValue = values[key];
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
        value = '';
    }
    for (let i = 1; i < arguments.length; i++) {
        const subValue = classes(arguments[i]);
        if (subValue) {
            value += (value ? ' ' : '') + subValue;
        }
    }
    return value;
}
const isIterable = typeof Symbol === 'undefined' ? value => Symbol.iterator in value : value => Array.isArray(value);
classes.isIterable = isIterable;

export default classes;
