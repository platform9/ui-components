"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const AutocompleteBase_1 = __importDefault(require("../components/AutocompleteBase"));
const uuid_1 = __importDefault(require("uuid"));
const ramda_1 = require("ramda");
const styles_1 = require("@material-ui/styles");
const FontAwesomeIcon_1 = __importDefault(require("../components/FontAwesomeIcon"));
const Text_1 = __importDefault(require("../elements/Text"));
const withTooltip_1 = __importDefault(require("../elements/tooltip/withTooltip"));
const useKeyValueStyles = (0, styles_1.makeStyles)((theme) => ({
    root: {
        display: 'grid',
        gridTemplateColumns: ({ showDeleteButton }) => showDeleteButton ? '172px 6px 172px 32px' : '185px 6px 185px',
        gridTemplateRows: '55px',
        gridGap: '12px',
        justifyItems: 'start',
        alignItems: 'center',
    },
    autocomplete: {
        width: '100%',
        '& .MuiFormControl-root': {
            marginTop: 0,
            marginBottom: 0,
            width: '100%',
        },
    },
    minus: {
        fontWeight: 900,
        color: theme.palette.blue.main,
        justifySelf: 'end',
    },
    additionalFields: {
        margin: theme.spacing(2, 0),
        width: '100%',
    },
}));
const KeyValue = ({ entry = {}, onChange, onDelete, keySuggestions = [], valueSuggestions = [], keyLabel = 'Key', valueLabel = 'Value', showDeleteButton = true, additionalFields = [], }) => {
    const classes = useKeyValueStyles({ showDeleteButton });
    const handleChange = (0, react_1.useCallback)((field) => (value) => onChange((0, ramda_1.assoc)(field, value, entry)), [entry, onChange]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: classes.root },
            react_1.default.createElement(AutocompleteBase_1.default, { inputProps: { size: 14 }, fullWidth: true, label: keyLabel, value: entry.key, onChange: handleChange('key'), suggestions: keySuggestions, className: classes.autocomplete }),
            react_1.default.createElement(Text_1.default, { variant: "body2" }, "-"),
            react_1.default.createElement(AutocompleteBase_1.default, { inputProps: { size: 14 }, fullWidth: true, label: valueLabel, value: entry.value, onChange: handleChange('value'), suggestions: valueSuggestions, className: classes.autocomplete }),
            showDeleteButton && (react_1.default.createElement(FontAwesomeIcon_1.default, { className: classes.minus, onClick: onDelete }, "minus-circle"))),
        additionalFields.map(({ id, label, Component, props }) => (react_1.default.createElement("div", { key: id, className: classes.additionalFields },
            react_1.default.createElement(Component, Object.assign({ id: id, label: label, value: entry[id] || '', onChange: handleChange(id) }, props)))))));
};
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'flex-start',
        maxWidth: '100%',
    },
    addNewEntryContainer: {
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
}));
const newEntry = () => ({ id: uuid_1.default.v4(), key: '', value: '' });
const initialEntry = newEntry();
// Unfortunately React forces us to use `key` for each item in an
// array and we can't use the index because that will break
// functionality if we delete anything in the middle of the array.
// This forces us to inject an id field into every entry and then
// filter it out before submitting. :(
const addId = (entry) => (Object.assign(Object.assign({}, entry), { id: uuid_1.default.v4() }));
const KeyValues = ({ entries: incomingEntries, onChange, keySuggestions = undefined, valueSuggestions = undefined, blacklistedTags = [], addLabel = 'Add', keyLabel = 'Key', valueLabel = 'Value', allowMultipleValues = true, additionalFields = [], }) => {
    const classes = useStyles({});
    const initialEntriesLoaded = (0, react_1.useRef)(false);
    const [entries, setEntries] = (0, react_1.useState)([initialEntry]);
    const addBlankEntry = () => setEntries([...entries, newEntry()]);
    const deleteEntry = (id) => () => setEntries(entries.filter((x) => x.id !== id));
    const handleChange = (0, react_1.useCallback)((entry) => {
        setEntries(entries.map((x) => (x.id === entry.id ? entry : x)));
    }, [entries]);
    (0, react_1.useEffect)(() => {
        // Load initial entries
        if (initialEntriesLoaded.current || incomingEntries === undefined)
            return;
        initialEntriesLoaded.current = true;
        const incomingEntriesWithIds = incomingEntries.map(addId);
        allowMultipleValues
            ? setEntries([...incomingEntriesWithIds, ...entries])
            : (incomingEntriesWithIds === null || incomingEntriesWithIds === void 0 ? void 0 : incomingEntriesWithIds.length)
                ? setEntries([...incomingEntriesWithIds])
                : setEntries([...entries]);
    }, [incomingEntries, entries]);
    (0, react_1.useEffect)(() => {
        // Remove empty entries and strip out id
        const noEmptyKeys = (x) => x.key.length > 0;
        const removeId = (entry) => (0, ramda_1.omit)(['id'], entry);
        const sanitized = (entries || []).filter(noEmptyKeys).map(removeId);
        onChange && onChange(sanitized);
    }, [entries]);
    const filteredEntries = entries.filter((entry) => !blacklistedTags.includes(entry.key));
    return (react_1.default.createElement("div", { className: classes.root },
        filteredEntries.map((entry) => (react_1.default.createElement(KeyValue, { key: entry.id, keySuggestions: keySuggestions, valueSuggestions: valueSuggestions, entry: entry, onChange: handleChange, onDelete: deleteEntry(entry.id), keyLabel: keyLabel, valueLabel: valueLabel, showDeleteButton: allowMultipleValues, additionalFields: additionalFields }))),
        allowMultipleValues && (react_1.default.createElement("div", { className: classes.addNewEntryContainer },
            react_1.default.createElement(FontAwesomeIcon_1.default, { className: classes.plus, onClick: addBlankEntry, size: "lg" }, "plus-circle"),
            react_1.default.createElement(Text_1.default, { variant: "body2" }, addLabel)))));
};
exports.default = (0, withTooltip_1.default)(KeyValues);
//# sourceMappingURL=KeyValues.js.map