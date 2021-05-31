export declare type FunctionsResolver = Record<string, Function>;
export declare type ReferenceResolver = (names: string[]) => Record<string, any>;
export declare type ReferenceResolverAsync = (names: string[]) => Promise<Record<string, any>>;
export declare class FormulaEngine {
    private resolveReferences;
    private functions;
    private parser;
    private evalVisitor;
    private refVisitor;
    constructor(resolveReferences: ReferenceResolver | ReferenceResolverAsync, functions: FunctionsResolver);
    exec(formula: string): any;
    execAsync(formula: string): Promise<any>;
    private getCst;
    private tokenize;
    private parse;
}
