import { createToken, Lexer, TokenType } from "chevrotain";

enum TokenName {
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
  Eq = "Eq",
}

const AdditionOperator = createToken({
  name: TokenName.AdditionOperator,
  pattern: Lexer.NA,
});
const Plus = createToken({
  name: TokenName.Plus,
  pattern: /\+/,
  categories: AdditionOperator,
});
const Minus = createToken({
  name: TokenName.Minus,
  pattern: /-/,
  categories: AdditionOperator,
});

const MultiplicationOperator = createToken({
  name: TokenName.MultiplicationOperator,
  pattern: Lexer.NA,
});
const Multi = createToken({
  name: TokenName.Multi,
  pattern: /\*/,
  categories: MultiplicationOperator,
});
const Div = createToken({
  name: TokenName.Div,
  pattern: /\//,
  categories: MultiplicationOperator,
});

const LParen = createToken({
  name: TokenName.LParen,
  pattern: /\(/,
});
const RParen = createToken({
  name: TokenName.RParen,
  pattern: /\)/,
});

const Function = createToken({
  name: TokenName.Function,
  pattern: /[A-Za-z_]+[A-Za-z_0-9.]*/,
});
const Reference = createToken({
  name: TokenName.Reference,
  pattern: /\{[A-Za-z_0-9\.]+\}/,
});

const Comma = createToken({
  name: TokenName.Comma,
  pattern: /,/,
});
const WhiteSpace = createToken({
  name: "WhiteSpace",
  pattern: /\s+/,
  group: Lexer.SKIPPED,
});

const BooleanLiteral = createToken({
  name: TokenName.BooleanLiteral,
  pattern: /TRUE|FALSE/i,
});
const NumberLiteral = createToken({
  name: TokenName.NumberLiteral,
  pattern: /[0-9]+[.]?[0-9]*([eE][+\-][0-9]+)?/,
});
const DStringLiteral = createToken({
  name: TokenName.DStringLiteral,
  pattern: /"(""|[^"])*"/,
});
const SStringLiteral = createToken({
  name: TokenName.SStringLiteral,
  pattern: /'(''|[^'])*'/,
});

const ComparisonOperator = createToken({
  name: TokenName.ComparisonOperator,
  pattern: Lexer.NA,
});
const Lt = createToken({
  name: TokenName.Lt,
  pattern: /</,
  categories: ComparisonOperator,
});
const Gt = createToken({
  name: TokenName.Gt,
  pattern: />/,
  categories: ComparisonOperator,
});
const Lte = createToken({
  name: TokenName.Lte,
  pattern: /<=/,
  categories: ComparisonOperator,
});
const Gte = createToken({
  name: TokenName.Gte,
  pattern: />=/,
  categories: ComparisonOperator,
});
const Eq = createToken({
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

export const FormulaLexer = new Lexer(tokensByPriority, {
  ensureOptimizations: true,
});

export type TokenTypeDict = { [key in TokenName]: TokenType };
export const tokens: TokenTypeDict = tokensByPriority.reduce(
  (acc, tokenType) => {
    acc[tokenType.name] = tokenType;
    return acc;
  },
  {} as TokenTypeDict
);
