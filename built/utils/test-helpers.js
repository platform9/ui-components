"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const misc_1 = require("./misc");
const generateTestId = (0, misc_1.memoize)((...params) => params
    .join('-')
    .toLowerCase()
    .replace(/[^0-9a-z]/gi, '-')
    .replace(/(-+)/g, '-')
    .replace(/^(-+)/g, ''));
exports.default = generateTestId;
//# sourceMappingURL=test-helpers.js.map