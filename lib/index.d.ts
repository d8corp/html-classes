export declare type ClassesArgument = (() => ClassesArgument) | string | {
    [key: string]: any;
} | ClassesArgument[];
declare function htmlClasses(...values: ClassesArgument[]): string;
declare namespace htmlClasses {
    var isIterable: (value: any) => boolean;
    var classes: (value: any) => string;
}
declare function htmlClasses(...values: any[]): string;
declare namespace htmlClasses {
    var isIterable: (value: any) => boolean;
    var classes: (value: any) => string;
}
export default htmlClasses;
