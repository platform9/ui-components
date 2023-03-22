"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Grid_1 = __importDefault(require("../../elements/grid/Grid"));
function ControlledGrid(props) {
    return (react_1.default.createElement(Grid_1.default, Object.assign({}, props, { compact: true, isControlled: true, disableToolbar: true, disableColumnOrdering: true, disableColumnHiding: true })));
}
exports.default = ControlledGrid;
//# sourceMappingURL=ControlledGrid.js.map