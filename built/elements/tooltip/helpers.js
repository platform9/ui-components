"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTooltipLeft = exports.getTooltipTop = void 0;
const getTooltipTop = (rect, align, offset) => {
    const additionalOffset = align === 'top' ? -offset : offset;
    if (align === 'middle') {
        return rect.top + rect.height / 2 + additionalOffset;
    }
    return rect[align] + additionalOffset;
};
exports.getTooltipTop = getTooltipTop;
const getTooltipLeft = (rect, align, offset) => {
    const additionalOffset = align === 'left' ? -offset : offset;
    if (align === 'middle') {
        return rect.left + rect.width / 2 + additionalOffset;
    }
    return rect[align] + additionalOffset;
};
exports.getTooltipLeft = getTooltipLeft;
//# sourceMappingURL=helpers.js.map