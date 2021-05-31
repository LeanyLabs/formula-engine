"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRefVisitor = exports.createEvalVisitor = void 0;
const chevrotain_1 = require("chevrotain");
const exceptions_1 = require("./exceptions");
const lexer_1 = require("./lexer");
function createEvalVisitor(parser, functions) {
    const FormulaVisitorBase = parser.getBaseCstVisitorConstructorWithDefaults();
    class InterpreterVisitor extends FormulaVisitorBase {
        constructor() {
            super();
            this.validateVisitor();
        }
        expression(ctx, state) {
            return this.visit(ctx.comparisonExpression, state);
        }
        comparisonExpression(ctx, state) {
            let left = this.visit(ctx.lhs, state);
            if (!ctx.rhs)
                return left;
            let right = this.visit(ctx.rhs, state);
            const operator = ctx.ComparisonOperator[0];
            if (chevrotain_1.tokenMatcher(operator, lexer_1.tokens.Lt)) {
                return left < right;
            }
            if (chevrotain_1.tokenMatcher(operator, lexer_1.tokens.Lte)) {
                return left <= right;
            }
            if (chevrotain_1.tokenMatcher(operator, lexer_1.tokens.Gt)) {
                return left > right;
            }
            if (chevrotain_1.tokenMatcher(operator, lexer_1.tokens.Gte)) {
                return left >= right;
            }
            if (chevrotain_1.tokenMatcher(operator, lexer_1.tokens.Eq)) {
                return left === right;
            }
            throw new Error(`Operator not implemented: ${operator}`);
        }
        additionExpression(ctx, state) {
            let result = this.visit(ctx.lhs, state);
            if (!ctx.rhs)
                return result;
            for (let i = 0; i < ctx.rhs.length; i++) {
                const operator = ctx.AdditionOperator[i];
                const value = this.visit(ctx.rhs[i], state);
                if (chevrotain_1.tokenMatcher(operator, lexer_1.tokens.Plus)) {
                    result += value;
                }
                else if (chevrotain_1.tokenMatcher(operator, lexer_1.tokens.Minus)) {
                    result -= value;
                }
                else {
                    throw new Error(`Unknown operator: ${operator.image} at ${operator.startOffset}`);
                }
            }
            return result;
        }
        multiplicationExpression(ctx, state) {
            let result = this.visit(ctx.lhs, state);
            if (!ctx.rhs)
                return result;
            for (let i = 0; i < ctx.rhs.length; i++) {
                const operator = ctx.MultiplicationOperator[i];
                const value = this.visit(ctx.rhs[i], state);
                if (chevrotain_1.tokenMatcher(operator, lexer_1.tokens.Multi)) {
                    result *= value;
                }
                else if (chevrotain_1.tokenMatcher(operator, lexer_1.tokens.Div)) {
                    result /= value;
                }
                else {
                    throw new Error(`Unknown operator: ${operator.image} at ${operator.startOffset}`);
                }
            }
            return result;
        }
        atomicExpression(ctx, state) {
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
        functionExpression(ctx, state) {
            const functionName = ctx.Function[0].image;
            const func = functions[functionName];
            if (!func) {
                throw new Error(`Unknown function: ${functionName} at ${ctx.Function[0].startOffset}`);
            }
            const args = this.visit(ctx.arguments[0], state);
            try {
                const result = func.apply({}, args);
                return result;
            }
            catch (err) {
                throw new exceptions_1.FunctionError(`Function ${functionName} at ${ctx.Function[0].startOffset} thrown an error: ${err}, stacktrace: ${err.stack}`, { originalError: err, functionName, function: ctx.Function[0] });
            }
        }
        reference(ctx, state) {
            const name = ctx.Reference[0].image.slice(1, -1);
            return state.externals[name];
        }
        parenthesisExpression(ctx, state) {
            return this.visit(ctx.expression, state);
        }
        arguments(ctx, state) {
            if (!ctx.additionExpression)
                return [];
            const result = ctx.additionExpression.map((arg) => this.visit(arg, state));
            return result;
        }
    }
    return new InterpreterVisitor();
}
exports.createEvalVisitor = createEvalVisitor;
function createRefVisitor(parser) {
    const FormulaVisitorBase = parser.getBaseCstVisitorConstructorWithDefaults();
    class RefVisitor extends FormulaVisitorBase {
        constructor() {
            super();
            this.validateVisitor();
        }
        reference(ctx, state) {
            const name = ctx.Reference[0].image.slice(1, -1);
            return state.externalNames.push(name);
        }
    }
    return new RefVisitor();
}
exports.createRefVisitor = createRefVisitor;
//# sourceMappingURL=visitor.js.map