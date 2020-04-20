declare function classes(...values: any[]): string;
declare namespace classes {
    var isIterable: (value: any) => boolean;
}
export default classes;
