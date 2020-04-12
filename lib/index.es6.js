function classes(value, ...other) {
    while (typeof value === 'function') {
        value = value();
    }
    if (typeof value === 'object' && value !== null) {
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
    else if (typeof value !== 'string') {
        value = '';
    }
    if (other.length) {
        const otherValue = classes(...other);
        if (otherValue) {
            value += (value ? ' ' : '') + otherValue;
        }
    }
    return value;
}
function isIterable(value) {
    return Symbol.iterator in value;
}
classes.isIterable = isIterable;

export default classes;
