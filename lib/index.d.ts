declare function classes(value?: any, ...other: any[]): string;
declare namespace classes {
    var isIterable: (value: object) => value is any[];
}
export default classes;
