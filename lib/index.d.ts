declare function classes(...values: any[]): string;
declare namespace classes {
    var isIterable: (value: object) => value is any[];
}
export default classes;
