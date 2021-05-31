"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.THROW = exports.NOW = exports.TO_UPPER = exports.ADD = exports.SUB = void 0;
function SUB(a, b) {
    return a - b;
}
exports.SUB = SUB;
function ADD(a, b) {
    return a + b;
}
exports.ADD = ADD;
function TO_UPPER(str) {
    return str.toUpperCase();
}
exports.TO_UPPER = TO_UPPER;
function NOW() {
    return "01-02-2021";
}
exports.NOW = NOW;
function THROW() {
    throw new Error("function failed");
}
exports.THROW = THROW;
//# sourceMappingURL=test-functions.js.map