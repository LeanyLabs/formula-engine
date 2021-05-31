"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormulaEngine = void 0;
const exceptions_1 = require("./exceptions");
const lexer_1 = require("./lexer");
const parser_1 = require("./parser");
const visitor_1 = require("./visitor");
class FormulaEngine {
    constructor(resolveReferences, functions) {
        this.resolveReferences = resolveReferences;
        this.functions = functions;
        this.parser = new parser_1.FormulaParser();
        this.evalVisitor = visitor_1.createEvalVisitor(this.parser, this.functions);
        this.refVisitor = visitor_1.createRefVisitor(this.parser);
    }
    exec(formula) {
        const cst = this.getCst(formula);
        const externalNames = [];
        this.refVisitor.visit(cst, { externalNames });
        const externals = this.resolveReferences(externalNames);
        const result = this.evalVisitor.visit(cst, { externals });
        return result;
    }
    async execAsync(formula) {
        const cst = this.getCst(formula);
        const externalNames = [];
        this.refVisitor.visit(cst, { externalNames });
        const externals = await this.resolveReferences(externalNames);
        const result = this.evalVisitor.visit(cst, { externals });
        return result;
    }
    getCst(formula) {
        const lexingResult = this.tokenize(formula);
        const cst = this.parse(lexingResult);
        return cst;
    }
    tokenize(formula) {
        const lexingResult = lexer_1.FormulaLexer.tokenize(formula);
        if (lexingResult.errors.length > 0) {
            throw new exceptions_1.LexerError("Tokenization error", lexingResult.errors);
        }
        return lexingResult;
    }
    parse(lexingResult) {
        this.parser.reset();
        this.parser.input = lexingResult.tokens;
        const cst = this.parser.expression();
        if (!cst || this.parser.errors.length > 0) {
            throw new exceptions_1.ParserError("Parsing error", this.parser.errors);
        }
        return cst;
    }
}
exports.FormulaEngine = FormulaEngine;
//# sourceMappingURL=engine.js.map