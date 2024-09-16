"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeHtml = exports.decodeHtml = void 0;
var decodeHtml = function (html) {
    var textarea = document.createElement('textarea');
    textarea.innerHTML = html;
    return textarea.value;
};
exports.decodeHtml = decodeHtml;
var encodeHtml = function (text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    return textarea.innerHTML;
};
exports.encodeHtml = encodeHtml;
//# sourceMappingURL=entities.js.map