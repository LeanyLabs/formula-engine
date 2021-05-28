import { CstParser } from "chevrotain";
import { tokens } from "./lexer";

export class FormulaParser extends CstParser {
  constructor() {
    super(tokens, {
      maxLookahead: 1,
    });
    this.performSelfAnalysis();
  }

  expression = this.RULE("expression", () => {
    this.SUBRULE(this.comparisonExpression);
  });

  comparisonExpression = this.RULE("comparisonExpression", () => {
    this.SUBRULE(this.additionExpression, { LABEL: "lhs" });
    this.OPTION(() => {
      this.CONSUME(tokens.ComparisonOperator);
      this.SUBRULE1(this.additionExpression, { LABEL: "rhs" });
    });
  });

  additionExpression = this.RULE("additionExpression", () => {
    this.SUBRULE(this.multiplicationExpression, { LABEL: "lhs" });
    this.MANY(() => {
      this.CONSUME(tokens.AdditionOperator);
      this.SUBRULE1(this.multiplicationExpression, { LABEL: "rhs" });
    });
  });

  multiplicationExpression = this.RULE("multiplicationExpression", () => {
    this.SUBRULE(this.atomicExpression, { LABEL: "lhs" });
    this.MANY(() => {
      this.CONSUME(tokens.MultiplicationOperator);
      this.SUBRULE1(this.atomicExpression, { LABEL: "rhs" });
    });
  });

  atomicExpression = this.RULE("atomicExpression", () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.functionExpression) },
      { ALT: () => this.SUBRULE(this.parenthesisExpression) },
      { ALT: () => this.SUBRULE(this.reference) },
      { ALT: () => this.CONSUME(tokens.NumberLiteral) },
      { ALT: () => this.CONSUME(tokens.BooleanLiteral) },
      { ALT: () => this.CONSUME(tokens.SStringLiteral) },
      { ALT: () => this.CONSUME(tokens.DStringLiteral) },
    ]);
  });

  reference = this.RULE("reference", () => {
    this.CONSUME(tokens.Reference);
  });

  functionExpression = this.RULE("functionExpression", () => {
    this.CONSUME(tokens.Function);
    this.CONSUME(tokens.LParen);
    this.SUBRULE(this.arguments);
    this.CONSUME(tokens.RParen);
  });

  parenthesisExpression = this.RULE("parenthesisExpression", () => {
    this.CONSUME(tokens.LParen);
    this.SUBRULE(this.expression);
    this.CONSUME(tokens.RParen);
  });

  arguments = this.RULE("arguments", () => {
    this.MANY_SEP({
      SEP: tokens.Comma,
      DEF: () => {
        this.SUBRULE(this.additionExpression);
      },
    });
  });
}
