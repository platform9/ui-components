"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const TabContext_1 = require("./TabContext");
function Tab(props) {
    (0, react_1.useEffect)(() => {
        const { addTab, value, label } = props;
        addTab({ value, label });
    }, []);
    const { activeTab, value, children } = props;
    if (value !== activeTab) {
        return null;
    }
    return children;
}
exports.default = (0, TabContext_1.withTabContext)(Tab);
//# sourceMappingURL=Tab.js.map