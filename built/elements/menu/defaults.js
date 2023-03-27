"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bottomLeft = exports.bottomRight = exports.bottomMiddle = exports.middleLeft = exports.middleRight = exports.topLeft = exports.topRight = exports.topMiddle = void 0;
const helpers_1 = require("./helpers");
// top
exports.topMiddle = (0, helpers_1.makeMenuPositionProps)('top', 'middle', 8, 0);
exports.topRight = (0, helpers_1.makeMenuPositionProps)('top', 'right', 8, 0);
exports.topLeft = (0, helpers_1.makeMenuPositionProps)('top', 'left', 8, 0);
// middle
exports.middleRight = (0, helpers_1.makeMenuPositionProps)('middle', 'right', 0, 8);
exports.middleLeft = (0, helpers_1.makeMenuPositionProps)('middle', 'left', 0, 8);
// bottom
exports.bottomMiddle = (0, helpers_1.makeMenuPositionProps)('bottom', 'middle', 8, 0);
exports.bottomRight = (0, helpers_1.makeMenuPositionProps)('bottom', 'right', 8, 0);
exports.bottomLeft = (0, helpers_1.makeMenuPositionProps)('bottom', 'left', 8, 0);
//# sourceMappingURL=defaults.js.map