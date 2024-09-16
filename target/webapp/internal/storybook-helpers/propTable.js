"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styled_components_1 = require("styled-components");
var Table = styled_components_1.default.table(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  border-collapse: collapse;\n  font-family: monospace;\n  white-space: pre;\n  thead tr {\n    text-align: left;\n    border-bottom: 1px solid black;\n  }\n"], ["\n  width: 100%;\n  border-collapse: collapse;\n  font-family: monospace;\n  white-space: pre;\n  thead tr {\n    text-align: left;\n    border-bottom: 1px solid black;\n  }\n"])));
var Required = styled_components_1.default.span(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  color: red;\n"], ["\n  color: red;\n"])));
var tableComponentFactory = function (propTypes) {
    return function () {
        var propNames = Object.keys(propTypes);
        var tableBody = propNames.map(function (property) {
            var _a = propTypes[property], _b = _a.required, required = _b === void 0 ? false : _b, _c = _a.propType, propType = _c === void 0 ? '-' : _c, _d = _a.defaultValue, defaultValue = _d === void 0 ? '' : _d, _e = _a.description, description = _e === void 0 ? '' : _e;
            return (React.createElement("tr", { key: property },
                React.createElement("td", null,
                    property,
                    required ? React.createElement(Required, null, "*") : null),
                React.createElement("td", null, propType),
                React.createElement("td", null, defaultValue),
                React.createElement("td", null, description)));
        });
        return (React.createElement(Table, null,
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null, "name"),
                    React.createElement("th", null, "type"),
                    React.createElement("th", null, "default"),
                    React.createElement("th", null, "description"))),
            React.createElement("tbody", null, tableBody)));
    };
};
exports.default = tableComponentFactory;
var templateObject_1, templateObject_2;
//# sourceMappingURL=propTable.js.map