"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var units_1 = require("../units");
var colors_1 = require("./colors");
var styled_components_1 = require("styled-components");
var css_1 = require("../../internal/css");
var Root = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin: 0;\n  padding: ", ";\n  display: flex;\n  flex-direction: column;\n  background-color: ", ";\n  ", ";\n"], ["\n  margin: 0;\n  padding: ", ";\n  display: flex;\n  flex-direction: column;\n  background-color: ", ";\n  ", ";\n"])), function (props) { return props.theme.mediumSpacing; }, colors_1.White, css_1.Dropshadow);
var TabRow = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  margin: 0;\n  padding: 0;\n  display: flex;\n  justify-content: flex-start;\n"], ["\n  margin: 0;\n  padding: 0;\n  display: flex;\n  justify-content: flex-start;\n"])));
var ControlsRow = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  margin: 0;\n  padding: 0;\n  display: flex;\n  justify-content: center;\n"], ["\n  margin: 0;\n  padding: 0;\n  display: flex;\n  justify-content: center;\n"])));
var Body = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  margin: 0;\n  margin-bottom: ", ";\n  margin-top: ", ";\n  padding: 0;\n  display: flex;\n"], ["\n  margin: 0;\n  margin-bottom: ", ";\n  margin-top: ", ";\n  padding: 0;\n  display: flex;\n"])), function (props) { return props.theme.minimumSpacing; }, function (props) { return props.theme.mediumSpacing; });
var Tab = styled_components_1.default.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: ", ";\n  padding: ", ";\n  cursor: pointer;\n  color: ", ";\n  background-color: ", ";\n  border: 1px solid ", ";\n  border-bottom: 1px solid\n    ", ";\n  :hover {\n    background-color: ", ";\n  }\n"], ["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: ", ";\n  padding: ", ";\n  cursor: pointer;\n  color: ", ";\n  background-color: ", ";\n  border: 1px solid ", ";\n  border-bottom: 1px solid\n    ", ";\n  :hover {\n    background-color: ", ";\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.minimumFontSize;
}, function (_a) {
    var theme = _a.theme;
    return theme.minimumSpacing;
}, colors_1.Black, colors_1.White, colors_1.Grey, function (props) { return (props.isSelected ? (0, colors_1.White)(props) : (0, colors_1.Grey)(props)); }, function (props) {
    return props.isSelected ? (0, colors_1.White)(props) : (0, colors_1.Silver)(props);
});
var Spacer = styled_components_1.default.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  flex-grow: 1;\n  border-bottom: 1px solid ", ";\n"], ["\n  flex-grow: 1;\n  border-bottom: 1px solid ", ";\n"])), colors_1.Grey);
var Button = styled_components_1.default.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: ", ";\n  line-height: ", ";\n  height: ", ";\n  padding: 0;\n  margin: 0;\n  opacity: ", ";\n  cursor: pointer;\n  color: ", ";\n  width: 8em;\n  background-color: ", ";\n  :hover {\n    opacity: 1;\n  }\n"], ["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: ", ";\n  line-height: ", ";\n  height: ", ";\n  padding: 0;\n  margin: 0;\n  opacity: ", ";\n  cursor: pointer;\n  color: ", ";\n  width: 8em;\n  background-color: ", ";\n  :hover {\n    opacity: 1;\n  }\n"])), function (props) { return props.theme.minimumFontSize; }, function (props) { return props.theme.minimumButtonSize; }, function (props) { return props.theme.minimumButtonSize; }, function (props) { return props.theme.minimumOpacity; }, colors_1.White, function (props) {
    return props.isSubmit ? (0, colors_1.SubmitButtonColor)(props) : (0, colors_1.ButtonColor)(props);
});
var CoordinateEditorDialog = function (_a) {
    var onOk = _a.onOk, setUnit = _a.setUnit, children = _a.children, unit = _a.unit, rest = __rest(_a, ["onOk", "setUnit", "children", "unit"]);
    var renderTab = function (tabUnit) { return (React.createElement(Tab, { isSelected: tabUnit === unit, onClick: function () { return setUnit(tabUnit); } }, tabUnit)); };
    return (React.createElement(Root, __assign({}, rest),
        React.createElement(TabRow, null,
            renderTab(units_1.LAT_LON),
            renderTab(units_1.LAT_LON_DMS),
            renderTab(units_1.USNG),
            renderTab(units_1.UTM),
            React.createElement(Spacer, null)),
        React.createElement(Body, null, children),
        React.createElement(ControlsRow, null,
            React.createElement(Button, { onClick: onOk, isSubmit: true }, "OK"))));
};
exports.default = CoordinateEditorDialog;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
//# sourceMappingURL=coordinate-editor-dialog.js.map