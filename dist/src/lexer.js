"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokens = exports.FormulaLexer = void 0;
const chevrotain_1 = require("chevrotain");
var TokenName;
(function (TokenName) {
    TokenName["AdditionOperator"] = "AdditionOperator";
    TokenName["Plus"] = "Plus";
    TokenName["Minus"] = "Minus";
    TokenName["MultiplicationOperator"] = "MultiplicationOperator";
    TokenName["Multi"] = "Multi";
    TokenName["Div"] = "Div";
    TokenName["LParen"] = "LParen";
    TokenName["RParen"] = "RParen";
    TokenName["WhiteSpace"] = "WhiteSpace";
    TokenName["Comma"] = "Comma";
    TokenName["Function"] = "Function";
    TokenName["Reference"] = "Reference";
    TokenName["NumberLiteral"] = "NumberLiteral";
    TokenName["DStringLiteral"] = "DStringLiteral";
    TokenName["SStringLiteral"] = "SStringLiteral";
    TokenName["BooleanLiteral"] = "BooleanLiteral";
    TokenName["ComparisonOperator"] = "ComparisonOperator";
    TokenName["Lt"] = "Lt";
    TokenName["Gt"] = "Gt";
    TokenName["Lte"] = "Lte";
    TokenName["Gte"] = "Gte";
    TokenName["Eq"] = "Eq";
})(TokenName || (TokenName = {}));
const AdditionOperator = chevrotain_1.createToken({
    name: TokenName.AdditionOperator,
    pattern: chevrotain_1.Lexer.NA,
});
const Plus = chevrotain_1.createToken({
    name: TokenName.Plus,
    pattern: /\+/,
    categories: AdditionOperator,
});
const Minus = chevrotain_1.createToken({
    name: TokenName.Minus,
    pattern: /-/,
    categories: AdditionOperator,
});
const MultiplicationOperator = chevrotain_1.createToken({
    name: TokenName.MultiplicationOperator,
    pattern: chevrotain_1.Lexer.NA,
});
const Multi = chevrotain_1.createToken({
    name: TokenName.Multi,
    pattern: /\*/,
    categories: MultiplicationOperator,
});
const Div = chevrotain_1.createToken({
    name: TokenName.Div,
    pattern: /\//,
    categories: MultiplicationOperator,
});
const LParen = chevrotain_1.createToken({
    name: TokenName.LParen,
    pattern: /\(/,
});
const RParen = chevrotain_1.createToken({
    name: TokenName.RParen,
    pattern: /\)/,
});
const Function = chevrotain_1.createToken({
    name: TokenName.Function,
    pattern: /[A-Za-z_]+[A-Za-z_0-9.]*/,
});
const Reference = chevrotain_1.createToken({
    name: TokenName.Reference,
    pattern: /\{[A-Za-z_]+\}/,
});
const Comma = chevrotain_1.createToken({
    name: TokenName.Comma,
    pattern: /,/,
});
const WhiteSpace = chevrotain_1.createToken({
    name: "WhiteSpace",
    pattern: /\s+/,
    group: chevrotain_1.Lexer.SKIPPED,
});
const BooleanLiteral = chevrotain_1.createToken({
    name: TokenName.BooleanLiteral,
    pattern: /TRUE|FALSE/i,
});
const NumberLiteral = chevrotain_1.createToken({
    name: TokenName.NumberLiteral,
    pattern: /[0-9]+[.]?[0-9]*([eE][+\-][0-9]+)?/,
});
const DStringLiteral = chevrotain_1.createToken({
    name: TokenName.DStringLiteral,
    pattern: /"(""|[^"])*"/,
});
const SStringLiteral = chevrotain_1.createToken({
    name: TokenName.SStringLiteral,
    pattern: /'(''|[^'])*'/,
});
const ComparisonOperator = chevrotain_1.createToken({
    name: TokenName.ComparisonOperator,
    pattern: chevrotain_1.Lexer.NA,
});
const Lt = chevrotain_1.createToken({
    name: TokenName.Lt,
    pattern: /</,
    categories: ComparisonOperator,
});
const Gt = chevrotain_1.createToken({
    name: TokenName.Gt,
    pattern: />/,
    categories: ComparisonOperator,
});
const Lte = chevrotain_1.createToken({
    name: TokenName.Lte,
    pattern: /<=/,
    categories: ComparisonOperator,
});
const Gte = chevrotain_1.createToken({
    name: TokenName.Gte,
    pattern: />=/,
    categories: ComparisonOperator,
});
const Eq = chevrotain_1.createToken({
    name: TokenName.Eq,
    pattern: /==/,
    categories: ComparisonOperator,
});
const tokensByPriority = [
    WhiteSpace,
    Plus,
    Minus,
    Multi,
    Div,
    Lte,
    Lt,
    Gte,
    Gt,
    Eq,
    LParen,
    RParen,
    DStringLiteral,
    SStringLiteral,
    BooleanLiteral,
    NumberLiteral,
    ComparisonOperator,
    AdditionOperator,
    MultiplicationOperator,
    Function,
    Reference,
    Comma,
];
exports.FormulaLexer = new chevrotain_1.Lexer(tokensByPriority, {
    ensureOptimizations: true,
});
exports.tokens = tokensByPriority.reduce((acc, tokenType) => {
    acc[tokenType.name] = tokenType;
    return acc;
}, {});
//# sourceMappingURL=lexer.js.map