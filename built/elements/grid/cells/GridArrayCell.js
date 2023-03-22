"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGridArrayCell = void 0;
const react_1 = __importDefault(require("react"));
const Text_1 = __importDefault(require("../../../elements/Text"));
function GridArrayCell({ value: items = [], nameFn, }) {
    return (react_1.default.createElement(Text_1.default, { lineClamp: 2, variant: "body2" }, items.map((item) => {
        const name = nameFn(item);
        return react_1.default.createElement("span", { key: name }, name);
    })));
}
exports.default = GridArrayCell;
function createGridArrayCell({ nameFn }) {
    return (props) => {
        return react_1.default.createElement(GridArrayCell, Object.assign({}, props, { nameFn: nameFn }));
    };
}
exports.createGridArrayCell = createGridArrayCell;
//# sourceMappingURL=GridArrayCell.js.map