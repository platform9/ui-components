"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeMenuPositionProps = exports.getMenuLeft = exports.getMenuBottom = exports.getMenuRight = exports.getMenuTop = exports.getMenuTransform = void 0;
const misc_1 = require("src/utils/misc");
const getMenuTransform = (scale) => (0, misc_1.memoize)(({ vertAlign, horizAlign }) => {
    const tLeft = horizAlign === 'middle' ? '50%' : '0%';
    const tTop = vertAlign === 'middle' ? '-50%' : '0%';
    if (vertAlign === 'middle' || horizAlign === 'middle') {
        return `scale(${scale}) translate(${tLeft}, ${tTop})`;
    }
    return `scale(${scale})`;
});
exports.getMenuTransform = getMenuTransform;
exports.getMenuTop = (0, misc_1.memoize)(({ vertAlign, vertOffset = 0 }) => {
    if (vertAlign === 'bottom') {
        return `calc(100% + ${vertOffset}px)`;
    }
    if (vertAlign === 'middle') {
        return `calc(50% + ${vertOffset}px)`;
    }
    return 'unset';
});
exports.getMenuRight = (0, misc_1.memoize)(({ horizAlign, horizOffset = 0 }) => {
    if (horizAlign === 'left') {
        return `calc(100% + ${horizOffset}px)`;
    }
    if (horizAlign === 'middle') {
        return `calc(50% + ${horizOffset}px)`;
    }
    return 'unset';
});
exports.getMenuBottom = (0, misc_1.memoize)(({ vertAlign, vertOffset = 0 }) => vertAlign === 'top' ? `calc(100% + ${vertOffset}px)` : 'unset');
exports.getMenuLeft = (0, misc_1.memoize)(({ horizAlign, horizOffset = 0 }) => horizAlign === 'right' ? `calc(100% + ${horizOffset}px)` : 'unset');
const makeMenuPositionProps = (va, ha, vo, ho) => ({
    align: {
        vertical: va,
        horizontal: ha,
    },
    offset: {
        vertical: vo,
        horizontal: ho,
    },
});
exports.makeMenuPositionProps = makeMenuPositionProps;
//# sourceMappingURL=helpers.js.map