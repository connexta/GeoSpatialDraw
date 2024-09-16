"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styled_components_1 = require("styled-components");
var Units = require("../units");
var dms_formatting_1 = require("../dms-formatting");
var utm_formatting_1 = require("../utm-formatting");
var coordinate_converter_1 = require("../coordinate-converter");
var Common = require("./common-styles");
var Row = Common.Row;
var Cell = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-grow: 1;\n  justify-content: flex-start;\n  margin: 0;\n  padding: 0;\n  margin-right: ", ";\n"], ["\n  display: flex;\n  flex-grow: 1;\n  justify-content: flex-start;\n  margin: 0;\n  padding: 0;\n  margin-right: ", ";\n"])), function (props) { return props.theme.minimumSpacing; });
var CoordinateValue = function (_a) {
    var lat = _a.lat, lon = _a.lon, unit = _a.unit;
    var cells;
    switch (unit) {
        case Units.LAT_LON:
            {
                cells = (React.createElement(React.Fragment, null,
                    React.createElement(Cell, null,
                        Math.abs(lat).toFixed(coordinate_converter_1.DECIMAL_DEGREES_PRECISION),
                        "\u00B0 ",
                        lat < 0 ? 'S' : 'N'),
                    React.createElement(Cell, null,
                        Math.abs(lon).toFixed(coordinate_converter_1.DECIMAL_DEGREES_PRECISION),
                        "\u00B0 ",
                        lon < 0 ? 'W' : 'E')));
            }
            break;
        case Units.LAT_LON_DMS:
            {
                var dmsPoint = coordinate_converter_1.latLonTo.LatLonDMS(lat, lon);
                cells = (React.createElement(React.Fragment, null,
                    React.createElement(Cell, null, (0, dms_formatting_1.dmsValueToString)(dmsPoint.lat, false)),
                    React.createElement(Cell, null, (0, dms_formatting_1.dmsValueToString)(dmsPoint.lon, true))));
            }
            break;
        case Units.USNG:
            {
                cells = coordinate_converter_1.latLonTo.USNG(lat, lon, coordinate_converter_1.USNG_CONVERSION_PRECISION);
            }
            break;
        case Units.UTM:
            {
                cells = (0, utm_formatting_1.utmToString)(coordinate_converter_1.latLonTo.UTM(lat, lon));
            }
            break;
    }
    return React.createElement(Row, null, cells);
};
exports.default = CoordinateValue;
var templateObject_1;
//# sourceMappingURL=coordinate-value.js.map