"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/styles");
const constants_1 = require("./constants");
exports.default = (0, styles_1.makeStyles)((theme) => ({
    dropdownWrapper: {
        position: 'relative',
        margin: 0,
        maxWidth: ({ width = constants_1.dropdownDefaultWidth }) => width,
        width: ({ compact }) => (compact ? 'unset' : '100%'),
        display: ({ compact }) => (compact ? 'flex' : 'block'),
        flexFlow: ({ compact }) => (compact ? 'row nowrap' : 'unset'),
        alignItems: ({ compact }) => (compact ? 'center' : 'unset'),
        justifyContent: ({ compact }) => (compact ? 'flex-end' : 'flex-end'),
        color: ({ disabled }) => disabled ? theme.components.input.label.disabled : theme.components.input.label.color,
        gap: 8,
    },
    inputFrame: Object.assign(Object.assign({}, theme.typography.inputPlaceholder), { marginTop: 1, position: 'relative', minHeight: ({ compact }) => (compact ? 30 : 36), paddingRight: 26, backgroundColor: ({ disabled }) => disabled
            ? theme.components.input.frame.disabledBackground
            : theme.components.input.frame.background, color: ({ disabled }) => disabled
            ? theme.components.input.frame.disabledPlaceholder
            : theme.components.input.frame.color, borderRadius: 4, borderColor: ({ error }) => {
            if (error) {
                return theme.components.dropdown.error;
            }
            return theme.components.input.frame.border;
        }, borderWidth: ({ compact }) => (compact ? 0 : 1), borderStyle: 'solid', padding: '0 8px', cursor: ({ disabled }) => (disabled ? 'not-allowed' : 'pointer'), pointerEvents: ({ disabled }) => (disabled ? 'none' : 'unset') }),
    label: {
        display: 'inline-block',
        marginLeft: 4,
        marginRight: 4,
        gridArea: 'input-label',
        transition: 'color .2s ease',
        fontWeight: ({ compact }) => (compact ? 400 : 600),
        marginBottom: ({ compact }) => (compact ? 0 : 8),
        color: ({ disabled }) => disabled ? theme.components.input.label.disabled : theme.components.input.label.color,
    },
    error: {
        marginLeft: 4,
        marginTop: 8,
        color: theme.components.dropdown.error,
        lineHeight: '16px',
    },
    expandedInputFrame: {
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
    },
    placeholder: {
        fontWeight: ({ compact }) => (compact ? 700 : 400),
        background: 'transparent',
        minHeight: ({ compact }) => (compact ? 30 : 36),
        lineHeight: 2.4,
        width: '100%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    selectedItem: {
        display: 'inline-flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        borderRadius: 4,
        marginTop: 4,
        marginBottom: 4,
        padding: '2px 6px',
        position: 'relative',
        fontSize: 13,
        height: 24,
        maxWidth: ({ compact, width = constants_1.dropdownDefaultWidth }) => compact
            ? width > 240
                ? width / 4 - 42
                : width / 3 - 55
            : width > 240
                ? width / 3 - 42
                : width / 2 - 55,
        marginRight: 4,
        color: theme.components.dropdown.selectedColor,
        backgroundColor: theme.components.dropdown.selectedBackground,
        '& > span': {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
        },
        '& > button': {
            width: 26,
            position: 'initial',
        },
    },
    unselectItemBtn: {
        cursor: 'pointer',
        lineHeight: 0.8,
        border: 'none',
        backgroundColor: 'transparent',
        padding: '0',
        fontSize: '16px',
        color: '#333',
    },
    clearBtn: {
        cursor: 'pointer',
        lineHeight: 0.8,
        border: 'none',
        backgroundColor: 'transparent',
        padding: '0',
        fontSize: '16px',
    },
}));
//# sourceMappingURL=useStyles.js.map