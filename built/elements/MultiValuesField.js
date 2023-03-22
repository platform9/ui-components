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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const withFormContext_1 = __importDefault(require("../components/validatedForm/withFormContext"));
const styles_1 = require("@material-ui/styles");
const FontAwesomeIcon_1 = __importDefault(require("../components/FontAwesomeIcon"));
const uuid_1 = __importDefault(require("uuid"));
const fp_1 = require("../utils/fp");
const clsx_1 = __importDefault(require("clsx"));
const Text_1 = __importDefault(require("./Text"));
const tooltip_1 = __importDefault(require("./tooltip"));
const defaults_1 = require("./menu/defaults");
const input_1 = __importDefault(require("./input"));
const useStyles = styles_1.makeStyles((theme) => ({
    multiValuesField: {
        maxWidth: '400px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    entries: {
        display: 'grid',
        gridTemplateColumns: '356px 32px',
        gridTemplateRows: '55px',
        gridGap: '12px',
        justifyItems: 'start',
        alignItems: 'center',
    },
    label: {
        color: theme.components.input.label.color,
    },
    minus: {
        fontWeight: 900,
        color: theme.palette.blue.main,
        justifySelf: 'end',
    },
    addNewEntry: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, max-content)',
        marginTop: theme.spacing(2),
        alignItems: 'center',
    },
    plus: {
        color: theme.palette.primary.main,
        marginRight: theme.spacing(2),
        fontWeight: 900,
    },
    hint: {
        cursor: 'help',
        transition: 'color .2s ease',
        color: theme.components.input.label.hint,
        '& i': {
            cursor: 'help',
            marginRight: 8,
            transition: 'color .2s ease',
            color: theme.components.input.label.hint,
        },
    },
}));
const createNewEntry = () => ({ id: uuid_1.default.v4(), value: '' });
const getInitialEntries = (values) => {
    if (fp_1.isNilOrEmpty(values))
        return [createNewEntry()];
    return values.map((value) => ({
        id: uuid_1.default.v4(),
        value,
    }));
};
const removeEmptyValuesAndStripId = (entries) => {
    const values = [];
    entries.forEach(({ value }) => {
        if (!values)
            return;
        values.push(value);
    });
    return values;
};
const MultiValuesField = ({ label, items: values, addLabel, placeholderText, onChange, info = '', }) => {
    const classes = useStyles({ info });
    const [entries, setEntries] = react_1.useState(getInitialEntries(values));
    react_1.useEffect(() => {
        onChange && onChange(removeEmptyValuesAndStripId(entries));
    }, [entries]);
    const handleChange = (updatedEntryId) => (event) => setEntries(entries.map((entry) => entry.id === updatedEntryId ? { id: entry.id, value: event.target.value } : entry));
    const addBlankEntry = () => setEntries([...entries, createNewEntry()]);
    const deleteEntry = (id) => () => setEntries(entries.filter((x) => x.id !== id));
    return (react_1.default.createElement("div", { className: classes.multiValuesField },
        react_1.default.createElement("div", { className: classes.header },
            label && (react_1.default.createElement(Text_1.default, { variant: "inputLabel", className: clsx_1.default(classes.label, 'label') }, label)),
            info && (react_1.default.createElement(tooltip_1.default, { message: info || label, align: defaults_1.topMiddle.align, offset: defaults_1.topMiddle.offset, origin: "right center", className: classes.info },
                react_1.default.createElement(Text_1.default, { variant: "inputLabel", className: classes.hint },
                    react_1.default.createElement(FontAwesomeIcon_1.default, null, "question-circle"),
                    "Hint")))),
        entries.map(({ id, value }) => (react_1.default.createElement("div", { key: id, className: classes.entries },
            react_1.default.createElement(input_1.default, { placeholder: placeholderText, value: value, onChange: handleChange(id) }),
            react_1.default.createElement(FontAwesomeIcon_1.default, { className: classes.minus, onClick: deleteEntry(id) }, "minus-circle")))),
        react_1.default.createElement("div", { className: classes.addNewEntry },
            react_1.default.createElement(FontAwesomeIcon_1.default, { className: classes.plus, onClick: addBlankEntry, size: "lg" }, "plus-circle"),
            react_1.default.createElement(Text_1.default, { variant: "body2" }, addLabel))));
};
exports.default = withFormContext_1.default(MultiValuesField);
//# sourceMappingURL=MultiValuesField.js.map