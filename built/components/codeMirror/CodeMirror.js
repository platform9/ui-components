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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/styles");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importStar(require("react"));
const react_codemirror2_1 = require("react-codemirror2");
const CopyButton_1 = __importDefault(require("src/elements/button/CopyButton"));
const FontAwesomeIcon_1 = __importDefault(require("../../components/FontAwesomeIcon"));
const Progress_1 = __importDefault(require("../../components/progress/Progress"));
const ErrorMessage_1 = require("../../components/validatedForm/ErrorMessage");
const Text_1 = __importDefault(require("../../elements/Text"));
const button_1 = __importDefault(require("../../elements/button"));
const card_1 = __importDefault(require("../../elements/card"));
const CardHeader_1 = __importDefault(require("../../elements/card/CardHeader"));
const defaults_1 = require("../../elements/menu/defaults");
const tooltip_1 = __importDefault(require("../../elements/tooltip"));
const SearchBar_1 = __importDefault(require("../SearchBar"));
const CodeMirrorModal_1 = __importDefault(require("./CodeMirrorModal"));
require('codemirror/mode/yaml/yaml');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/addon/display/autorefresh');
require('codemirror/addon/search/searchcursor');
require('codemirror/addon/mode/simple');
const defaultOptions = {
    lineNumbers: true,
    mode: 'yaml',
    theme: 'default',
    autoRefresh: true,
    extraKeys: {
        Tab: (cm) => {
            const spaces = Array(cm.getOption('indentUnit') + 1).join(' ');
            cm.replaceSelection(spaces);
        },
        'Alt-F': 'findPersistent',
    },
    fixedGutter: false,
};
// These styles are to match CodeMirrors. We need to find a good way
// to re-define their styles so we can use common variables
function CodeMirror(_a) {
    var { id, variant, label, value, hasError, errorMessage, onChange, options = {}, info, align = defaults_1.topRight.align, className, showSearchBar = false, extraActions = null, loading = false, showCopyButton = false, showDownloadButton = false, downloadFileName = '', showExpandButton = false, showCollapseButton = false, maxHeight = 350, collapseYaml = false, downloadButtonProps = {}, copyButtonProps = {} } = _a, restProps = __rest(_a, ["id", "variant", "label", "value", "hasError", "errorMessage", "onChange", "options", "info", "align", "className", "showSearchBar", "extraActions", "loading", "showCopyButton", "showDownloadButton", "downloadFileName", "showExpandButton", "showCollapseButton", "maxHeight", "collapseYaml", "downloadButtonProps", "copyButtonProps"]);
    const codeMirrorInput = (0, react_1.createRef)();
    const [height, setHeight] = (0, react_1.useState)(maxHeight);
    const classes = useStyles({ variant, height });
    const [searchTerm, setSearchTerm] = react_1.default.useState('');
    const [editor, setEditor] = react_1.default.useState(null);
    const [isModalOpen, setModalOpen] = (0, react_1.useState)(false);
    const [showCode, setShowCode] = (0, react_1.useState)(!collapseYaml);
    (0, react_1.useEffect)(() => {
        setHeight(showCode ? maxHeight : 0);
    }, [showCode, collapseYaml]);
    const handleChange = (0, react_1.useCallback)((editor, data, value) => {
        if (onChange) {
            onChange(value);
        }
    }, [onChange]);
    const combinedOptions = Object.assign(Object.assign({}, defaultOptions), options);
    const search = (0, react_1.useCallback)(() => {
        if (!editor)
            return;
        const query = new RegExp(searchTerm, 'gi');
        const cursor = editor.getSearchCursor(query);
        let firstMatchLineNumber = null;
        while (cursor.findNext()) {
            editor.markText(cursor.from(), cursor.to(), { className: classes.highlight });
            if (!firstMatchLineNumber) {
                firstMatchLineNumber = cursor.pos.from.line;
            }
        }
        if (firstMatchLineNumber) {
            editor.scrollIntoView(firstMatchLineNumber);
        }
    }, [editor, searchTerm]);
    const clearMarks = (0, react_1.useCallback)(() => {
        if (!editor)
            return;
        editor.doc.getAllMarks().forEach((marker) => marker.clear());
    }, [editor]);
    (0, react_1.useEffect)(() => {
        clearMarks();
        search();
    }, [searchTerm]);
    const downloadFile = () => {
        const element = document.createElement('a');
        const file = new Blob([value], {
            type: 'text/plain',
        });
        element.href = URL.createObjectURL(file);
        element.download = downloadFileName;
        document.body.appendChild(element);
        element.click();
    };
    const toggleYamlCardView = (0, react_1.useCallback)(() => setShowCode(!showCode), [showCode, setShowCode]);
    const renderActionsBar = showSearchBar ||
        showCopyButton ||
        showDownloadButton ||
        extraActions ||
        showExpandButton ||
        showCollapseButton;
    // @ts-ignore
    return (react_1.default.createElement(card_1.default, { withCustomBody: true, className: classes.card },
        (!!label || !!renderActionsBar) && (react_1.default.createElement(CardHeader_1.default, { className: classes.cardHeader },
            react_1.default.createElement("div", { className: classes.labelContainer },
                showCollapseButton && (react_1.default.createElement(tooltip_1.default, { message: "Collapse", align: defaults_1.topRight.align },
                    react_1.default.createElement(FontAwesomeIcon_1.default, { regular: true, size: "md", className: classes.icon, onClick: toggleYamlCardView }, showCode ? 'chevron-down' : 'chevron-right'))),
                label && (react_1.default.createElement(Text_1.default, { className: "code-mirror-header", variant: "subtitle2" }, label))),
            renderActionsBar && (react_1.default.createElement("div", { className: `CodeMirror-actionsBar ${classes.actionsBar}` },
                showSearchBar && (react_1.default.createElement(SearchBar_1.default, { className: classes.searchBar, searchTerm: searchTerm, onSearchChange: (value) => setSearchTerm(value) })),
                showCopyButton && react_1.default.createElement(CopyButton_1.default, { copyText: value, disabled: !value }),
                showDownloadButton && (react_1.default.createElement(button_1.default, Object.assign({ type: "button", onClick: downloadFile, icon: "download" }, downloadButtonProps), "Download")),
                showExpandButton && (react_1.default.createElement(tooltip_1.default, { message: "Expand", align: defaults_1.topLeft.align },
                    react_1.default.createElement(FontAwesomeIcon_1.default, { regular: true, className: classes.icon, onClick: () => setModalOpen(true) }, "expand"))),
                isModalOpen && (react_1.default.createElement(CodeMirrorModal_1.default, { label: label, value: value, open: isModalOpen, onClose: () => setModalOpen(false) })),
                extraActions && extraActions)))),
        react_1.default.createElement(Progress_1.default, { loading: loading, renderContentOnMount: true, overlay: true, className: classes.progressOverlay },
            react_1.default.createElement(react_codemirror2_1.Controlled, Object.assign({}, restProps, { 
                /*
                // @ts-ignore */
                ref: codeMirrorInput, className: (0, clsx_1.default)(classes.baseCodeMirror, className), onBeforeChange: handleChange, value: value, options: combinedOptions, editorDidMount: (editor) => setEditor(editor), gutters: classes.gutters })),
            react_1.default.createElement(ErrorMessage_1.ErrorMessage, { className: classes.errorMsg }, errorMessage))));
}
exports.default = CodeMirror;
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    progressOverlay: {
        maxHeight: '50%',
        boxSizing: 'border-box',
    },
    gutters: {
        width: 64,
    },
    card: {
        '& .progress-root': {
            height: 'max-content',
            minHeight: '0',
        },
    },
    cardHeader: {
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'space-between',
        gridAutoFlow: 'column',
        padding: '10px 16px 10px 24px',
    },
    icon: { width: 20 },
    labelContainer: { display: 'flex' },
    actionsBar: {
        display: 'grid',
        gap: theme.spacing(2),
        alignItems: 'center',
        gridAutoFlow: 'column',
    },
    searchBar: {
        gap: 0,
    },
    highlight: {
        backgroundColor: theme.components.graph.fadedWarning,
    },
    baseCodeMirror: {
        '& .CodeMirror': {
            fontFamily: 'SpaceMono',
            fontWeight: 'normal',
            height: 1000,
            maxHeight: ({ height }) => height,
            color: theme.components.card.text,
            direction: 'ltr',
            caretColor: theme.components.card.text,
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: 'transparent',
            fontSize: 14,
            transition: ' max-height 0.3s ease',
        },
        '& .CodeMirror *': { caretColor: `${theme.components.card.text} !important` },
        '& .CodeMirror-lines': { padding: '16px 0', cursor: 'text', minHeight: '1px' },
        '& .CodeMirror pre': {
            padding: '0',
            MozBorderRadius: '0',
            WebkitBorderRadius: '0',
            borderRadius: '0',
            borderWidth: '0',
            background: 'transparent',
            fontFamily: 'SpaceMono',
            fontWeight: 'normal',
            fontSize: 14,
            margin: '0',
            whiteSpace: 'pre',
            wordWrap: 'normal',
            lineHeight: '24px',
            color: 'inherit',
            zIndex: 2,
            position: 'relative',
            overflow: 'visible',
            WebkitTapHighlightColor: 'transparent',
            WebkitFontVariantLigatures: 'contextual',
            fontVariantLigatures: 'none', // Had to change to fix UX-1918
        },
        '& .CodeMirror-scrollbar-filler, & .CodeMirror-gutter-filler': {
            backgroundColor: 'white',
        },
        '& .CodeMirror-gutters': {
            // borderRight: `2px solid ${theme.components.card.border}`,
            backgroundColor: 'transparent',
            whiteSpace: 'nowrap',
            position: 'absolute',
            left: '0',
            top: '0',
            minHeight: '100%',
            zIndex: 3,
        },
        '& .CodeMirror-linenumber': {
            padding: '0 32px 0 16px',
            minWidth: '20px',
            textAlign: 'right',
            color: theme.components.card.text,
            whiteSpace: 'nowrap',
        },
        '& .CodeMirror-guttermarker': { color: 'black' },
        '& .CodeMirror-guttermarker-subtle': { color: theme.components.typography.passive },
        '& .CodeMirror-cursor': {
            borderLeft: `1px solid ${theme.components.card.text}`,
            borderRight: 'none',
            width: '0',
            position: 'absolute',
            pointerEvents: 'none',
        },
        '& .CodeMirror div.CodeMirror-secondarycursor': {
            borderLeft: '1px solid silver',
        },
        '& .cm-fat-cursor .CodeMirror-cursor': {
            width: 'auto',
            border: '0 !important',
            background: theme.components.card.text,
        },
        '& .cm-fat-cursor div.CodeMirror-cursors': { zIndex: 1 },
        '& .cm-fat-cursor-mark': {
            backgroundColor: 'rgba(20, 255, 20, 0.5)',
            WebkitAnimation: 'blink 1.06s steps(1) infinite',
            MozAnimation: 'blink 1.06s steps(1) infinite',
            animation: 'blink 1.06s steps(1) infinite',
        },
        '& .cm-animate-fat-cursor': {
            width: 'auto',
            border: '0',
            WebkitAnimation: 'blink 1.06s steps(1) infinite',
            MozAnimation: 'blink 1.06s steps(1) infinite',
            animation: 'blink 1.06s steps(1) infinite',
            backgroundColor: theme.components.card.text,
        },
        '& @keyframes blink': {
            '0%': {},
            '50%': { backgroundColor: 'transparent' },
            '100%': {},
        },
        '& .cm-tab': { display: 'inline-block', textDecoration: 'inherit' },
        '& .CodeMirror-rulers': {
            position: 'absolute',
            left: '0',
            right: '0',
            top: '-50px',
            bottom: '-20px',
            overflow: 'hidden',
        },
        '& .CodeMirror-ruler': {
            borderLeft: `1px solid ${theme.components.card.border}`,
            visibility: 'hidden',
            top: '0',
            bottom: '0',
            position: 'absolute',
        },
        /*
          Text Colors
        */
        '& .cm-s-default .cm-header, & .cm-s-default .cm-string.cm-property': {
            color: theme.components.code.text,
        },
        '& .cm-s-default .cm-quote': { color: theme.components.card.text },
        '& .cm-negative': { color: theme.components.card.text },
        '& .cm-positive': { color: theme.components.card.text },
        '& .cm-header, & .cm-strong': { fontWeight: 'bold' },
        '& .cm-em': { fontStyle: 'italic' },
        '& .cm-link': { textDecoration: 'underline' },
        '& .cm-strikethrough': { textDecoration: 'line-through' },
        '& .cm-s-default .cm-keyword': { color: theme.components.card.text },
        '& .cm-s-default .cm-atom': { color: theme.components.code.text },
        '& .cm-s-default .cm-number': { color: theme.components.card.text },
        '& .cm-s-default .cm-def': { color: theme.components.card.text },
        '& .cm-s-default .cm-variable-2': { color: theme.components.card.text },
        '& .cm-s-default .cm-variable-3, & .cm-s-default .cm-type': {
            color: theme.components.card.text,
        },
        '& .cm-s-default .cm-comment': { color: theme.components.typography.passive },
        '& .cm-s-default .cm-string': { color: theme.components.card.text },
        '& .cm-s-default .cm-string-2': { color: theme.components.card.text },
        '& .cm-s-default .cm-meta': { color: theme.components.card.text },
        '& .cm-s-default .cm-qualifier': { color: theme.components.card.text },
        '& .cm-s-default .cm-builtin': { color: theme.components.card.text },
        '& .cm-s-default .cm-bracket': { color: theme.components.card.text },
        '& .cm-s-default .cm-tag': { color: theme.components.card.text },
        '& .cm-s-default .cm-attribute': { color: theme.components.card.text },
        '& .cm-s-default .cm-hr': { color: theme.components.card.text },
        '& .cm-s-default .cm-link': { color: theme.components.card.text },
        '& .cm-s-default .cm-error': { color: theme.components.card.text },
        '& .cm-invalidchar': { color: theme.components.card.text },
        '& .CodeMirror-composing': { borderBottom: '2px solid' },
        '& div.CodeMirror span.CodeMirror-matchingbracket': { color: theme.components.card.text },
        '& div.CodeMirror span.CodeMirror-nonmatchingbracket': { color: theme.components.card.text },
        '& .CodeMirror-matchingtag': { background: 'rgba(255, 150, 0, 0.3)' },
        '& .CodeMirror-activeline-background': { background: theme.components.card.activeBackground },
        '& .CodeMirror-scroll': {
            overflow: 'scroll !important',
            marginBottom: '-30px',
            marginRight: '-30px',
            paddingBottom: '30px',
            height: '100%',
            width: '100%',
            outline: 'none',
            position: 'relative',
        },
        '& .CodeMirror-sizer': {
            position: 'relative',
            borderRight: '30px solid transparent',
        },
        '& .CodeMirror-vscrollbar, & .CodeMirror-hscrollbar, & .CodeMirror-scrollbar-filler, & .CodeMirror-gutter-filler': {
            position: 'absolute',
            zIndex: 6,
            display: 'none',
        },
        '& .CodeMirror-vscrollbar': {
            right: '0',
            top: '0',
            overflowX: 'hidden',
            overflowY: 'scroll',
        },
        '& .CodeMirror-hscrollbar': {
            bottom: '0',
            left: '0',
            overflowY: 'hidden',
            overflowX: 'scroll',
        },
        '& .CodeMirror-scrollbar-filler': { right: '0', bottom: '0' },
        '& .CodeMirror-gutter-filler': { left: '0', bottom: '0' },
        '& .CodeMirror-gutter': {
            whiteSpace: 'normal',
            height: '100%',
            display: 'inline-block',
            verticalAlign: 'top',
            marginBottom: '-30px',
        },
        '& .CodeMirror-gutter-wrapper': {
            position: 'absolute',
            zIndex: 4,
            background: 'none !important',
            border: 'none !important',
        },
        '& .CodeMirror-gutter-background': {
            position: 'absolute',
            top: '0',
            bottom: '0',
            zIndex: 4,
        },
        '& .CodeMirror-gutter-elt': {
            position: 'absolute',
            cursor: 'default',
            zIndex: 4,
        },
        '& .CodeMirror-gutter-wrapper ::selection': { backgroundColor: 'transparent' },
        '& .CodeMirror-gutter-wrapper ::-moz-selection': {
            backgroundColor: 'transparent',
        },
        '& .CodeMirror-wrap pre': {
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
            wordBreak: 'normal',
        },
        '& .CodeMirror-linebackground': {
            position: 'absolute',
            left: '0',
            right: '0',
            top: '0',
            bottom: '0',
            zIndex: 0,
        },
        '& .CodeMirror-linewidget': {
            position: 'relative',
            zIndex: 2,
            padding: '0.1px',
        },
        '& .CodeMirror-rtl pre': { direction: 'rtl' },
        '& .CodeMirror-code': { outline: 'none' },
        '& .CodeMirror-scroll, & .CodeMirror-sizer, & .CodeMirror-gutter, & .CodeMirror-gutters, & .CodeMirror-linenumber': {
            MozBoxSizing: 'content-box',
            boxSizing: 'content-box',
        },
        '& .CodeMirror-measure': {
            position: 'absolute',
            width: '100%',
            height: '0',
            overflow: 'hidden',
            visibility: 'hidden',
        },
        '& .CodeMirror-measure pre': { position: 'static' },
        '& div.CodeMirror-cursors': {
            visibility: 'hidden',
            position: 'relative',
            zIndex: 3,
        },
        '& div.CodeMirror-dragcursors': { visibility: 'visible' },
        '& .CodeMirror-focused div.CodeMirror-cursors': { visibility: 'visible' },
        '& .CodeMirror-selected': { background: theme.components.card.activeBackground },
        '& .CodeMirror-focused .CodeMirror-selected': {
            background: theme.components.card.activeBackground,
        },
        '& .CodeMirror-crosshair': { cursor: 'crosshair' },
        '& .CodeMirror-line::selection, & .CodeMirror-line > span::selection, & .CodeMirror-line > span > span::selection': {
            background: theme.components.card.activeBackground,
        },
        '& .CodeMirror-line::-moz-selection, & .CodeMirror-line > span::-moz-selection, & .CodeMirror-line > span > span::-moz-selection': {
            background: theme.components.card.activeBackground,
        },
        '& .cm-searching': { backgroundColor: theme.components.graph.fadedWarning },
        '& .cm-force-border': { paddingRight: '0.1px' },
        '& @media print': {
            '& .CodeMirror div.CodeMirror-cursors': { visibility: 'hidden' },
        },
        '& .cm-tab-wrap-hack:after': { content: "''" },
        '& span.CodeMirror-selectedtext': { background: 'none' },
    },
    errorMsg: {
        margin: theme.spacing(2),
    },
}));
//# sourceMappingURL=CodeMirror.js.map