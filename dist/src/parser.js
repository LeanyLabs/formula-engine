"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormulaParser = void 0;
const chevrotain_1 = require("chevrotain");
const lexer_1 = require("./lexer");
class FormulaParser extends chevrotain_1.CstParser {
    constructor() {
        super(lexer_1.tokens, {
            maxLookahead: 1,
        });
        this.expression = this.RULE("expression", () => {
            this.SUBRULE(this.comparisonExpression);
        });
        this.comparisonExpression = this.RULE("comparisonExpression", () => {
            this.SUBRULE(this.additionExpression, { LABEL: "lhs" });
            this.OPTION(() => {
                this.CONSUME(lexer_1.tokens.ComparisonOperator);
                this.SUBRULE1(this.additionExpression, { LABEL: "rhs" });
            });
        });
        this.additionExpression = this.RULE("additionExpression", () => {
            this.SUBRULE(this.multiplicationExpression, { LABEL: "lhs" });
            this.MANY(() => {
                this.CONSUME(lexer_1.tokens.AdditionOperator);
                this.SUBRULE1(this.multiplicationExpression, { LABEL: "rhs" });
            });
        });
        this.multiplicationExpression = this.RULE("multiplicationExpression", () => {
            this.SUBRULE(this.atomicExpression, { LABEL: "lhs" });
            this.MANY(() => {
                this.CONSUME(lexer_1.tokens.MultiplicationOperator);
                this.SUBRULE1(this.atomicExpression, { LABEL: "rhs" });
            });
        });
        this.atomicExpression = this.RULE("atomicExpression", () => {
            this.OR([
                { ALT: () => this.SUBRULE(this.functionExpression) },
                { ALT: () => this.SUBRULE(this.parenthesisExpression) },
                { ALT: () => this.SUBRULE(this.reference) },
                { ALT: () => this.CONSUME(lexer_1.tokens.NumberLiteral) },
                { ALT: () => this.CONSUME(lexer_1.tokens.BooleanLiteral) },
                { ALT: () => this.CONSUME(lexer_1.tokens.SStringLiteral) },
                { ALT: () => this.CONSUME(lexer_1.tokens.DStringLiteral) },
            ]);
        });
        this.reference = this.RULE("reference", () => {
            this.CONSUME(lexer_1.tokens.Reference);
        });
        this.functionExpression = this.RULE("functionExpression", () => {
            this.CONSUME(lexer_1.tokens.Function);
            this.CONSUME(lexer_1.tokens.LParen);
            this.SUBRULE(this.arguments);
            this.CONSUME(lexer_1.tokens.RParen);
        });
        this.parenthesisExpression = this.RULE("parenthesisExpression", () => {
            this.CONSUME(lexer_1.tokens.LParen);
            this.SUBRULE(this.expression);
            this.CONSUME(lexer_1.tokens.RParen);
        });
        this.arguments = this.RULE("arguments", () => {
            this.MANY_SEP({
                SEP: lexer_1.tokens.Comma,
                DEF: () => {
                    this.SUBRULE(this.additionExpression);
                },
            });
        });
        this.performSelfAnalysis();
    }
}
exports.FormulaParser = FormulaParser;
//# sourceMappingURL=parser.js.map