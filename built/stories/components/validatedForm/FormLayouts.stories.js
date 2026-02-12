"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cards = exports.Sections = void 0;
const react_1 = __importDefault(require("react"));
const ValidatedForm_1 = __importDefault(require("../../../components/validatedForm/ValidatedForm"));
const FormFieldCard_1 = require("../../../components/validatedForm/FormFieldCard");
const FormFieldSection_1 = __importDefault(require("../../../components/validatedForm/FormFieldSection"));
const TextField_1 = __importDefault(require("../../../components/validatedForm/TextField"));
const Text_1 = __importDefault(require("../../../elements/Text"));
const button_1 = __importDefault(require("../../../elements/button"));
const react_router_dom_1 = require("react-router-dom");
const meta = {
    title: 'Components/ValidatedForm/Layouts',
    decorators: [
        (Story) => (react_1.default.createElement(react_router_dom_1.MemoryRouter, null,
            react_1.default.createElement(Story, null))),
    ],
};
exports.default = meta;
const Wrapper = ({ children }) => (react_1.default.createElement(ValidatedForm_1.default, { initialValues: {}, onSubmit: () => { } }, children));
exports.Sections = {
    render: () => (react_1.default.createElement(Wrapper, null,
        react_1.default.createElement(FormFieldSection_1.default, { title: "Section 1: Basic Info", step: 1 },
            react_1.default.createElement(TextField_1.default, { id: "f1", label: "Field 1" }),
            react_1.default.createElement(TextField_1.default, { id: "f2", label: "Field 2" })),
        react_1.default.createElement(FormFieldSection_1.default, { title: "Section 2: Details", step: 2, info: "This section has an info tooltip" },
            react_1.default.createElement(TextField_1.default, { id: "f3", label: "Field 3" }))))
};
exports.Cards = {
    render: () => (react_1.default.createElement("div", { style: { backgroundColor: '#f5f5f5', padding: 20 } },
        react_1.default.createElement(Wrapper, null,
            react_1.default.createElement(FormFieldCard_1.FormFieldCard, { title: "Card 1", step: 1, topContent: react_1.default.createElement(Text_1.default, { variant: "body2", style: { marginBottom: 16 } }, "Some description content inside the card.") },
                react_1.default.createElement(TextField_1.default, { id: "c1", label: "Card Field 1" })),
            react_1.default.createElement("br", null),
            react_1.default.createElement(FormFieldCard_1.FormFieldCard, { title: "Card 2", step: 2, link: react_1.default.createElement(button_1.default, { variant: "secondary" }, "Action") },
                react_1.default.createElement(TextField_1.default, { id: "c2", label: "Card Field 2" })))))
};
//# sourceMappingURL=FormLayouts.stories.js.map