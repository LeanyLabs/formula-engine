import { CstNode, tokenMatcher } from "chevrotain";
import { ExecutionError, FunctionError } from "./exceptions";
import { tokens } from "./lexer";
import { FormulaParser } from "./parser";

export interface IVisitor {
  visit(cst: CstNode, state: any): any;
}

export function createEvalVisitor(
  parser: FormulaParser,
  functions: any
): IVisitor {
  const FormulaVisitorBase = parser.getBaseCstVisitorConstructorWithDefaults();

  class InterpreterVisitor extends FormulaVisitorBase {
    constructor() {
      super();
      this.validateVisitor();
    }

    expression(ctx, state): any {
      return this.visit(ctx.comparisonExpression, state);
    }

    comparisonExpression(ctx, state): any {
      let left = this.visit(ctx.lhs, state);
      if (!ctx.rhs) return left;

      let right = this.visit(ctx.rhs, state);
      const operator = ctx.ComparisonOperator[0];

      if (tokenMatcher(operator, tokens.Lt)) {
        return left < right;
      }
      if (tokenMatcher(operator, tokens.Lte)) {
        return left <= right;
      }
      if (tokenMatcher(operator, tokens.Gt)) {
        return left > right;
      }
      if (tokenMatcher(operator, tokens.Gte)) {
        return left >= right;
      }
      if (tokenMatcher(operator, tokens.Eq)) {
        return left === right;
      }
      throw new ExecutionError(`Operator not implemented: ${operator}`, {
        operator,
        context: ctx,
      });
    }

    additionExpression(ctx, state): any {
      let result = this.visit(ctx.lhs, state);
      if (!ctx.rhs) return result;
      for (let i = 0; i < ctx.rhs.length; i++) {
        const operator = ctx.AdditionOperator[i];
        const value = this.visit(ctx.rhs[i], state);
        if (tokenMatcher(operator, tokens.Plus)) {
          result += value;
        } else if (tokenMatcher(operator, tokens.Minus)) {
          result -= value;
        } else {
          throw new ExecutionError(
            `Unknown operator: ${operator.image} at ${operator.startOffset}`,
            { operator, context: ctx }
          );
        }
      }
      return result;
    }

    multiplicationExpression(ctx, state): any {
      let result = this.visit(ctx.lhs, state);
      if (!ctx.rhs) return result;
      for (let i = 0; i < ctx.rhs.length; i++) {
        const operator = ctx.MultiplicationOperator[i];
        const value = this.visit(ctx.rhs[i], state);
        if (tokenMatcher(operator, tokens.Multi)) {
          result *= value;
        } else if (tokenMatcher(operator, tokens.Div)) {
          result /= value;
        } else {
          throw new ExecutionError(
            `Unknown operator: ${operator.image} at ${operator.startOffset}`,
            { operator, context: ctx }
          );
        }
      }
      return result;
    }

    atomicExpression(ctx, state): any {
      if (ctx.functionExpression) {
        return this.visit(ctx.functionExpression, state);
      }
      if (ctx.parenthesisExpression) {
        return this.visit(ctx.parenthesisExpression, state);
      }
      if (ctx.reference) {
        return this.visit(ctx.reference, state);
      }
      if (ctx.NumberLiteral) {
        return Number.parseFloat(ctx.NumberLiteral[0].image);
      }
      if (ctx.BooleanLiteral) {
        return ctx.BooleanLiteral[0].image === "true" ? true : false;
      }
      if (ctx.SStringLiteral) {
        return ctx.SStringLiteral[0].image.slice(1, -1).replace(/''/, "'");
      }
      if (ctx.DStringLiteral) {
        return ctx.DStringLiteral[0].image.slice(1, -1).replace(/""/, '"');
      }
    }

    functionExpression(ctx, state): any {
      const functionName = ctx.Function[0].image;
      const func = functions[functionName];

      if (!func) {
        throw new ExecutionError(
          `Unknown function: ${functionName} at ${ctx.Function[0].startOffset}`,
          { functionName, context: ctx }
        );
      }

      const args = this.visit(ctx.arguments[0], state);

      try {
        const result = func.apply({}, args);
        return result;
      } catch (err) {
        throw new FunctionError(
          `Function ${functionName} at ${ctx.Function[0].startOffset} thrown an error: ${err}, stacktrace: ${err.stack}`,
          {
            originalError: err,
            functionName,
            function: ctx.Function[0],
            context: ctx,
          }
        );
      }
    }

    reference(ctx, state): any {
      const name = ctx.Reference[0].image.slice(1, -1);
      return state.externals[name];
    }

    parenthesisExpression(ctx, state): any {
      return this.visit(ctx.expression, state);
    }

    arguments(ctx, state): any {
      if (!ctx.additionExpression) return [];
      const result = ctx.additionExpression.map((arg) =>
        this.visit(arg, state)
      );
      return result;
    }
  }

  return new InterpreterVisitor();
}

export function createRefVisitor(parser: FormulaParser): IVisitor {
  const FormulaVisitorBase = parser.getBaseCstVisitorConstructorWithDefaults();

  class RefVisitor extends FormulaVisitorBase {
    constructor() {
      super();
      this.validateVisitor();
    }

    reference(ctx, state): any {
      const name = ctx.Reference[0].image.slice(1, -1);
      return state.externalNames.push(name);
    }
  }

  return new RefVisitor();
}
