"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var styled_components_1 = require("styled-components");
var number_input_1 = require("./number-input");
var Common = require("./common-styles");
var usng_js_1 = require("usng.js");
var coordinate_converter_1 = require("../coordinate-converter");
var MAX_EASTING = 834000;
var MIN_EASTING = 160000;
var MAX_NORTHING = 10000000;
var MIN_NORTHING = 0;
var NUMBER_OF_ZONE_VALUES = 61;
var Root = Common.Column;
var InputGroup = styled_components_1.default.label(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin: 0;\n  padding: 0;\n  display: flex;\n  margin-bottom: ", ";\n"], ["\n  margin: 0;\n  padding: 0;\n  display: flex;\n  margin-bottom: ", ";\n"])), function (props) { return props.theme.minimumSpacing; });
var SelectGroup = Common.Row;
var Label = Common.Label;
var HemisphereButton = Common.SpacedToggleButton;
var UTMInput = (0, styled_components_1.default)(number_input_1.default)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 6em;\n"], ["\n  width: 6em;\n"])));
var UTMPointEditor = /** @class */ (function (_super) {
    __extends(UTMPointEditor, _super);
    function UTMPointEditor(props) {
        var _this = _super.call(this, props) || this;
        _this.unitConverter = new usng_js_1.Converter();
        return _this;
    }
    UTMPointEditor.prototype.render = function () {
        var _this = this;
        var _a = this.props, lat = _a.lat, lon = _a.lon, setCoordinate = _a.setCoordinate;
        var _b = coordinate_converter_1.latLonTo.UTM(lat, lon), easting = _b.easting, northing = _b.northing, zone = _b.zone, hemisphere = _b.hemisphere;
        return (React.createElement(Root, null,
            React.createElement(InputGroup, null,
                React.createElement(Label, null, "Easting"),
                React.createElement(UTMInput, { value: easting, maxValue: MAX_EASTING, minValue: MIN_EASTING, decimalPlaces: 0, onChange: function (value) {
                        var _a = _this.unitConverter.UTMtoLLwithNS(northing, value, zone, null, hemisphere), lat = _a.lat, lon = _a.lon;
                        setCoordinate(lat, lon);
                    } })),
            React.createElement(InputGroup, null,
                React.createElement(Label, null, "Northing"),
                React.createElement(UTMInput, { value: northing, maxValue: MAX_NORTHING, minValue: MIN_NORTHING, decimalPlaces: 0, onChange: function (value) {
                        var _a = _this.unitConverter.UTMtoLLwithNS(value, easting, zone, null, hemisphere), lat = _a.lat, lon = _a.lon;
                        setCoordinate(lat, lon);
                    } })),
            React.createElement(InputGroup, null,
                React.createElement(Label, null, "Zone"),
                React.createElement("select", { value: zone, onChange: function (_a) {
                        var value = _a.currentTarget.value;
                        var _b = _this.unitConverter.UTMtoLLwithNS(northing, easting, parseInt(value), null, hemisphere), lat = _b.lat, lon = _b.lon;
                        setCoordinate(lat, lon);
                    } }, Array(NUMBER_OF_ZONE_VALUES)
                    .fill(0)
                    .map(function (_, zone) { return (React.createElement("option", { key: zone, value: zone }, zone)); }))),
            React.createElement(SelectGroup, null,
                React.createElement(Label, null, "Hemisphere"),
                React.createElement(HemisphereButton, { title: "Northern Hemisphere", isSelected: hemisphere === 'N', onClick: function () {
                        var _a = _this.unitConverter.UTMtoLLwithNS(northing, easting, zone, null, 'N'), lat = _a.lat, lon = _a.lon;
                        setCoordinate(lat, lon);
                    } }, "N"),
                React.createElement(HemisphereButton, { title: "Southern Hemisphere", isSelected: hemisphere === 'S', onClick: function () {
                        var _a = _this.unitConverter.UTMtoLLwithNS(northing, easting, zone, null, 'S'), lat = _a.lat, lon = _a.lon;
                        setCoordinate(lat, lon);
                    } }, "S"))));
    };
    return UTMPointEditor;
}(React.Component));
exports.default = UTMPointEditor;
var templateObject_1, templateObject_2;
//# sourceMappingURL=utm-point-editor.js.map