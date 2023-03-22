"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Text_1 = __importDefault(require("../../elements/Text"));
const styles_1 = require("@material-ui/styles");
const ramda_1 = require("ramda");
const clsx_1 = __importDefault(require("clsx"));
const test_helpers_1 = __importDefault(require("../../utils/test-helpers"));
const fp_1 = require("../../utils/fp");
const Divider_1 = __importDefault(require("../../elements/Divider"));
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    reviewTable: {
        borderSpacing: '8px',
        tableLayout: 'fixed',
    },
    divider: {
        margin: theme.spacing(1, 0, 1, 0),
    },
    disabledText: {
        color: theme.components.typography.passive,
    },
    rowValue: {
        color: theme.components.typography.default,
    },
    rowLabel: {
        display: 'flex',
        width: 360,
    },
    header: {
        display: 'flex',
        gap: theme.spacing(0.5),
        marginTop: theme.spacing(3.5),
    },
    bold: {
        fontWeight: 600,
    },
    subHeader: {
        fontWeight: 'normal',
    },
}));
const DataRow = ({ label, value, data, renderArray = false, render = ramda_1.identity, key, jointRender = undefined, }) => {
    const classes = useStyles({});
    return (react_1.default.createElement("tr", { "data-testid": (0, test_helpers_1.default)(label, 'row') },
        react_1.default.createElement("td", { "data-testid": (0, test_helpers_1.default)(label, 'fieldname'), className: classes.rowLabel },
            react_1.default.createElement(Text_1.default, { variant: "body2", component: "span" }, label)),
        react_1.default.createElement("td", { "data-testid": (0, test_helpers_1.default)(label, 'fieldvalue') },
            react_1.default.createElement(Text_1.default, { variant: "caption1", className: (0, clsx_1.default)(classes.rowValue, value === 'Not Enabled' && classes.disabledText), component: "span", key: key }, !renderArray && Array.isArray(value)
                ? value.map((val, idx) => (react_1.default.createElement(Text_1.default, { key: idx, variant: "caption1" },
                    jointRender
                        ? jointRender(val, data)
                        : render(val || val === false || val === 0 ? `${val} ` : '-'),
                    "\u00A0")))
                : jointRender
                    ? jointRender(value, data)
                    : render(value || value === false || value === 0 ? value : '-')))));
};
const FormReviewTable = ({ data, columns, className }) => {
    const classes = useStyles({});
    const elems = [];
    if (!data)
        return null;
    for (const column of columns) {
        const { id, hide, title, insertDivider, RowComponent, header, subHeader } = column;
        if (hide && hide(data)) {
            continue;
        }
        const value = (0, fp_1.pathStrOr)('-', id, data);
        if (header) {
            elems.push(react_1.default.createElement("th", { "data-testid": (0, test_helpers_1.default)(id, 'title'), className: classes.header },
                react_1.default.createElement(Text_1.default, { component: "span", className: classes.bold }, header),
                react_1.default.createElement(Text_1.default, { component: "span", className: classes.subHeader }, subHeader)));
        }
        if (insertDivider) {
            // We have a new section, insert a divider
            elems.push(react_1.default.createElement("tr", { "data-testid": (0, test_helpers_1.default)(column.id, 'divider'), key: `${column.id}-divider` },
                react_1.default.createElement("td", { colSpan: 2 },
                    react_1.default.createElement(Divider_1.default, { className: classes.divider }))));
        }
        if (column.title) {
            elems.push(react_1.default.createElement("th", { "data-testid": (0, test_helpers_1.default)(column.id, 'title'), className: classes.rowLabel },
                react_1.default.createElement(Text_1.default, { variant: "caption1" }, column.title)));
        }
        elems.push(RowComponent ? (react_1.default.createElement(RowComponent, Object.assign({ key: `row-${id}-${value}` }, column, { value: value }))) : (react_1.default.createElement(DataRow, Object.assign({ key: `row-${id}-${value}` }, column, { value: value, data: data }))));
    }
    return (react_1.default.createElement("table", { className: (0, clsx_1.default)(className, classes.reviewTable) },
        react_1.default.createElement("tbody", null, elems)));
};
exports.default = FormReviewTable;
//# sourceMappingURL=review-table.js.map