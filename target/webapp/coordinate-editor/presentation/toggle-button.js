"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var styled_components_1 = require("styled-components");
var colors_1 = require("./colors");
var ToggleButton = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: ", ";\n  background-color: ", ";\n  cursor: pointer;\n  color: ", ";\n  :hover {\n    background-color: ", ";\n    color: ", ";\n  }\n"], ["\n  padding: ", ";\n  background-color: ", ";\n  cursor: pointer;\n  color: ", ";\n  :hover {\n    background-color: ", ";\n    color: ", ";\n  }\n"])), function (props) { return props.theme.minimumSpacing; }, function (props) {
    return props.isSelected ? props.theme.primaryColor : 'transparent';
}, colors_1.Black, colors_1.Black, colors_1.White);
exports.default = ToggleButton;
var templateObject_1;
//# sourceMappingURL=toggle-button.js.map