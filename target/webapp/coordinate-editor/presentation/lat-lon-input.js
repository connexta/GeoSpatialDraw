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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LongitudeInput = exports.LatitudeInput = void 0;
var React = require("react");
var styled_components_1 = require("styled-components");
var number_input_1 = require("./number-input");
var coordinate_converter_1 = require("../coordinate-converter");
var DegreeInput = (0, styled_components_1.default)(number_input_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 8rem;\n"], ["\n  width: 8rem;\n"])));
var LatitudeInput = function (props) { return (React.createElement(DegreeInput, __assign({ maxValue: 90, minValue: -90, decimalPlaces: coordinate_converter_1.DECIMAL_DEGREES_PRECISION }, props))); };
exports.LatitudeInput = LatitudeInput;
var LongitudeInput = function (props) { return (React.createElement(DegreeInput, __assign({ maxValue: 180, minValue: -180, decimalPlaces: coordinate_converter_1.DECIMAL_DEGREES_PRECISION }, props))); };
exports.LongitudeInput = LongitudeInput;
var templateObject_1;
//# sourceMappingURL=lat-lon-input.js.map