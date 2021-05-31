import { CstParser } from "chevrotain";
export declare class FormulaParser extends CstParser {
    constructor();
    expression: (idxInCallingRule?: number, ...args: any[]) => import("chevrotain").CstNode;
    comparisonExpression: (idxInCallingRule?: number, ...args: any[]) => import("chevrotain").CstNode;
    additionExpression: (idxInCallingRule?: number, ...args: any[]) => import("chevrotain").CstNode;
    multiplicationExpression: (idxInCallingRule?: number, ...args: any[]) => import("chevrotain").CstNode;
    atomicExpression: (idxInCallingRule?: number, ...args: any[]) => import("chevrotain").CstNode;
    reference: (idxInCallingRule?: number, ...args: any[]) => import("chevrotain").CstNode;
    functionExpression: (idxInCallingRule?: number, ...args: any[]) => import("chevrotain").CstNode;
    parenthesisExpression: (idxInCallingRule?: number, ...args: any[]) => import("chevrotain").CstNode;
    arguments: (idxInCallingRule?: number, ...args: any[]) => import("chevrotain").CstNode;
}
