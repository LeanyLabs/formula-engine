import { Lexer, TokenType } from "chevrotain";
declare enum TokenName {
    AdditionOperator = "AdditionOperator",
    Plus = "Plus",
    Minus = "Minus",
    MultiplicationOperator = "MultiplicationOperator",
    Multi = "Multi",
    Div = "Div",
    LParen = "LParen",
    RParen = "RParen",
    WhiteSpace = "WhiteSpace",
    Comma = "Comma",
    Function = "Function",
    Reference = "Reference",
    NumberLiteral = "NumberLiteral",
    DStringLiteral = "DStringLiteral",
    SStringLiteral = "SStringLiteral",
    BooleanLiteral = "BooleanLiteral",
    ComparisonOperator = "ComparisonOperator",
    Lt = "Lt",
    Gt = "Gt",
    Lte = "Lte",
    Gte = "Gte",
    Eq = "Eq"
}
export declare const FormulaLexer: Lexer;
export declare type TokenTypeDict = {
    [key in TokenName]: TokenType;
};
export declare const tokens: TokenTypeDict;
export {};
