"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionError = exports.ExecutionError = exports.LexerError = exports.ParserError = exports.FormulaError = void 0;
class FormulaError extends Error {
    constructor(message, details) {
        super(message);
        this.details = details;
    }
}
exports.FormulaError = FormulaError;
class ParserError extends FormulaError {
}
exports.ParserError = ParserError;
class LexerError extends FormulaError {
}
exports.LexerError = LexerError;
class ExecutionError extends FormulaError {
}
exports.ExecutionError = ExecutionError;
class FunctionError extends ExecutionError {
}
exports.FunctionError = FunctionError;
//# sourceMappingURL=exceptions.js.map