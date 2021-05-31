export declare class FormulaError extends Error {
    details: any;
    constructor(message: string, details: any);
}
export declare class ParserError extends FormulaError {
}
export declare class LexerError extends FormulaError {
}
export declare class ExecutionError extends FormulaError {
}
export declare class FunctionError extends ExecutionError {
}
