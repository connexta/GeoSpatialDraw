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
var styled_components_1 = require("styled-components");
var dms_formatting_1 = require("../dms-formatting");
var dms_value_editor_1 = require("./dms-value-editor");
var Common = require("./common-styles");
var Root = Common.BBoxRoot;
var TextGroup = styled_components_1.default.label(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin: 0;\n  padding: 0;\n  display: flex;\n"], ["\n  margin: 0;\n  padding: 0;\n  display: flex;\n"])));
var Label = Common.CompactLabel;
var LatLonDMSBBoxEditor = function (_a) {
    var setBBox = _a.setBBox, rest = __rest(_a, ["setBBox"]);
    var bbox = rest;
    var north = (0, dms_formatting_1.decimalToDMS)(bbox.north);
    var south = (0, dms_formatting_1.decimalToDMS)(bbox.south);
    var east = (0, dms_formatting_1.decimalToDMS)(bbox.east);
    var west = (0, dms_formatting_1.decimalToDMS)(bbox.west);
    return (React.createElement(Root, { flexDirection: "column" },
        React.createElement(TextGroup, null,
            React.createElement(Label, null, "North"),
            React.createElement(dms_value_editor_1.DMSLatitudeEditor, { value: north, setValue: function (value) {
                    setBBox(__assign(__assign({}, bbox), { north: (0, dms_formatting_1.dmsToDecimal)(value) }));
                } })),
        React.createElement(TextGroup, null,
            React.createElement(Label, null, "South"),
            React.createElement(dms_value_editor_1.DMSLatitudeEditor, { value: south, setValue: function (value) {
                    setBBox(__assign(__assign({}, bbox), { south: (0, dms_formatting_1.dmsToDecimal)(value) }));
                } })),
        React.createElement(TextGroup, null,
            React.createElement(Label, null, "East"),
            React.createElement(dms_value_editor_1.DMSLongitudeEditor, { value: east, setValue: function (value) {
                    setBBox(__assign(__assign({}, bbox), { east: (0, dms_formatting_1.dmsToDecimal)(value) }));
                } })),
        React.createElement(TextGroup, null,
            React.createElement(Label, null, "West"),
            React.createElement(dms_value_editor_1.DMSLongitudeEditor, { value: west, setValue: function (value) {
                    setBBox(__assign(__assign({}, bbox), { west: (0, dms_formatting_1.dmsToDecimal)(value) }));
                } }))));
};
exports.default = LatLonDMSBBoxEditor;
var templateObject_1;
//# sourceMappingURL=lat-lon-dms-bbox-editor.js.map