"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const engine_1 = require("../src/engine");
const functions = __importStar(require("./test-functions"));
describe("Engine", () => {
    function resolveReferencesSync(names) {
        return {
            a: 10,
            b: 20,
        };
    }
    const engine = new engine_1.FormulaEngine(resolveReferencesSync, functions);
    function assertEqual(formula, result) {
        expect(engine.exec(formula)).toEqual(result);
    }
    describe("simple operations", () => {
        describe("add/subtract", () => {
            it("should work for literals", () => {
                assertEqual("10 + 20", 30);
            });
            it("should work for references", () => {
                assertEqual("{a} + {b}", 30);
            });
            it("should work for literals - sub", () => {
                assertEqual("10 - 20", -10);
            });
        });
        describe("mul/div", () => {
            it("should work for literals", () => {
                assertEqual("10 * 20", 200);
            });
            it("should work for references", () => {
                assertEqual("{a} * {b}", 200);
            });
        });
        describe("priorities", () => {
            it("should do mul before addition", () => {
                assertEqual("1 + 2 * 3", 7);
            });
            it("should do div before addition", () => {
                assertEqual("1 + 3 / 3", 2);
            });
            it("should do op in parens first", () => {
                assertEqual("(1 + 3) / 2", 2);
            });
            it("should do add/mul before comparison", () => {
                assertEqual("1 + 4 / 2 < 3 + 1", true);
            });
        });
        describe("formatting", () => {
            it("should work w/o whitespace separators", () => {
                assertEqual("10+20", 30);
                assertEqual("10+ 20", 30);
                assertEqual("10 +20", 30);
                assertEqual("1 + 2 *3", 7);
                assertEqual("1+2 *3", 7);
            });
        });
        describe("functions", () => {
            it("should use custom functions", () => {
                assertEqual("ADD(1, 2)", 3);
            });
            it("should calc function arguments", () => {
                assertEqual("ADD(1+2, 3)", 6);
            });
            it("should resolve refs", () => {
                assertEqual("ADD({a}, 3)", 13);
            });
            it("should calc functions as arguments", () => {
                assertEqual("ADD(SUB({a}, 3), 10)", 17);
            });
            it("should work with strings as return value", async () => {
                assertEqual("'The date is: ' + NOW()", "The date is: 01-02-2021");
            });
        });
    });
    describe("data types", () => {
        describe("strings", () => {
            it("should add strings", () => {
                assertEqual("'a' + 'b'", "ab");
            });
            it("should add dbl quoted strings", () => {
                assertEqual(`"a" + "b"`, "ab");
            });
            it("should be able to use string as a function argument", async () => {
                assertEqual(`TO_UPPER('abc')`, "ABC");
            });
        });
    });
    describe("comparison", () => {
        it("should compare two values", async () => {
            assertEqual(`10 > 20`, false);
            assertEqual(`10 < 20`, true);
        });
        it("should compare two values with lt/gt equal", async () => {
            assertEqual(`10 >= 20`, false);
            assertEqual(`30 <= 20`, false);
            assertEqual(`10 <= 10`, true);
            assertEqual(`10 >= 10`, true);
        });
        it("should compare two values for equality", async () => {
            assertEqual(`10 == 20`, false);
            assertEqual(`20 == 20`, true);
        });
        it("should compare string for equality", async () => {
            assertEqual(`'one' == "one"`, true);
            assertEqual(`'one' == 'one'`, true);
            assertEqual(`'one' == 'two'`, false);
            assertEqual(`'one' == 'ONE'`, false);
        });
        it("should compare variables", async () => {
            assertEqual(`{a} < {b}`, true);
            assertEqual(`{a} > {b}`, false);
            assertEqual(`{a} == 10`, true);
        });
    });
    describe("invalid syntax", () => {
        it("should throw ParsingError", async () => {
            expect(() => engine.exec(`10 <*`)).toThrowErrorMatchingSnapshot();
        });
        it("should throw LexerError", async () => {
            expect(() => engine.exec(`^`)).toThrowErrorMatchingSnapshot();
        });
    });
    describe("functions", () => {
        it("should throw FunctionError if function fails", async () => {
            expect(() => engine.exec(`THROW()`)).toThrowError();
        });
    });
});
//# sourceMappingURL=engine.spec.js.map