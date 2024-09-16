"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Common = require("./common-styles");
var usng_input_1 = require("./usng-input");
var usng_js_1 = require("usng.js");
var coordinate_converter_1 = require("../coordinate-converter");
var Root = Common.Column;
var TextGroup = Common.Row;
var Label = Common.Label;
var USNGPointEditor = /** @class */ (function (_super) {
    __extends(USNGPointEditor, _super);
    function USNGPointEditor(props) {
        var _this = _super.call(this, props) || this;
        _this.unitConverter = new usng_js_1.Converter();
        return _this;
    }
    USNGPointEditor.prototype.render = function () {
        var _this = this;
        var _a = this.props, lat = _a.lat, lon = _a.lon, setCoordinate = _a.setCoordinate;
        var usng = coordinate_converter_1.latLonTo.USNG(lat, lon, coordinate_converter_1.USNG_CONVERSION_PRECISION);
        return (React.createElement(Root, null,
            React.createElement(TextGroup, null,
                React.createElement(Label, null, "USNG/MGRS"),
                React.createElement(usng_input_1.default, { value: usng, onChange: function (usng) {
                        var matrix = _this.unitConverter.isUSNG(usng);
                        var converted = _this.unitConverter.USNGtoLL(matrix, true);
                        setCoordinate(converted.lat, converted.lon);
                    } }))));
    };
    return USNGPointEditor;
}(React.Component));
exports.default = USNGPointEditor;
//# sourceMappingURL=usng-point-editor.js.map