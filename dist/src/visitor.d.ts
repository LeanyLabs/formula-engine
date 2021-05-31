import { CstNode } from "chevrotain";
import { FormulaParser } from "./parser";
export interface IVisitor {
    visit(cst: CstNode, state: any): any;
}
export declare function createEvalVisitor(parser: FormulaParser, functions: any): IVisitor;
export declare function createRefVisitor(parser: FormulaParser): IVisitor;
