const isIterable = typeof Symbol === 'undefined'
    ? (value) => Array.isArray(value)
    : (value) => Symbol.iterator in value;
function classes(value) {
    if (typeof value === 'string') {
        return value;
    }
    if (typeof value === 'object' && value !== null) {
        let result = '';
        if (isIterable(value)) {
            for (let subValue of value) {
                subValue = classes(subValue);
                if (subValue) {
                    result += (result ? ' ' : '') + subValue;
                }
            }
        }
        else {
            for (const key in value) {
                let subValue = value[key];
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

export { classes, classes as default, isIterable };
