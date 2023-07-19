"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const downloadFile = ({ filename, contents, contentType = 'application/octet-stream', }) => {
    const blob = new Blob([contents], { type: contentType });
    const elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
};
exports.default = downloadFile;
//# sourceMappingURL=downloadFile.js.map