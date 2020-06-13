declare function classes(...values: any[]): string;
declare namespace classes {
    var isIterable: (value: any) => boolean;
}
export declare type ClassesArgument = (() => ClassesArgument) | string | {
    [key: string]: any;
} | ClassesArgument[];
export default classes;
