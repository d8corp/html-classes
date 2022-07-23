export declare type ClassesArray<K extends string = string> = ClassesArgument<K>[];
export declare type ClassesFunction<K extends string = string> = () => ClassesArgument<K>;
export declare type ClassesMeta<K extends string = string> = {
    [T in K]?: any;
};
export declare type Primitives = string | symbol | undefined | number | boolean | null;
export declare type ClassesArgument<K extends string = string> = ClassesFunction<K> | Primitives | ClassesMeta<K> | ClassesArray<K>;
export declare const isIterable: (value: any) => value is {
    [Symbol.iterator]: any;
};
export declare function classes<S extends string>(value?: ClassesArgument<S>): string;
export declare namespace classes {
    var isIterable: (value: any) => value is {
        [Symbol.iterator]: any;
    };
}
export default classes;
