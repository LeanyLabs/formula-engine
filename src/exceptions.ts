export class FormulaError extends Error {
  public details: any;
  constructor(message: string, details: any) {
    super(message);
    this.details = details;
  }
}

export class ParserError extends FormulaError {}
export class LexerError extends FormulaError {}

export class ExecutionError extends FormulaError {}
export class FunctionError extends ExecutionError {}
