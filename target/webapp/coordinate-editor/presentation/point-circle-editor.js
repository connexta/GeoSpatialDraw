"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircleEditor = exports.FixedHeightPointEditor = void 0;
var React = require("react");
var styled_components_1 = require("styled-components");
var point_editor_1 = require("../container/point-editor");
var length_editor_1 = require("./length-editor");
var Common = require("./common-styles");
var Root = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  min-width: 25rem;\n"], ["\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  min-width: 25rem;\n"])));
var PointRoot = (0, styled_components_1.default)(Root)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  min-height: 8rem;\n"], ["\n  min-height: 8rem;\n"])));
var CircleRoot = (0, styled_components_1.default)(Root)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  min-height: 10rem;\n"], ["\n  min-height: 10rem;\n"])));
var InputGroup = styled_components_1.default.label(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  margin: 0;\n  margin-top: ", ";\n  padding: 0;\n  display: flex;\n"], ["\n  margin: 0;\n  margin-top: ", ";\n  padding: 0;\n  display: flex;\n"])), function (props) { return props.theme.minimumSpacing; });
var Label = Common.Label;
var FixedHeightPointEditor = function (_a) {
    var coordinateUnit = _a.coordinateUnit, lat = _a.lat, lon = _a.lon, setCoordinate = _a.setCoordinate;
    return (React.createElement(PointRoot, null,
        React.createElement(point_editor_1.default, { lat: lat, lon: lon, unit: coordinateUnit, setCoordinate: setCoordinate })));
};
exports.FixedHeightPointEditor = FixedHeightPointEditor;
var CircleEditor = function (_a) {
    var radius = _a.radius, radiusUnit = _a.radiusUnit, coordinateUnit = _a.coordinateUnit, lat = _a.lat, lon = _a.lon, setRadius = _a.setRadius, setRadiusUnit = _a.setRadiusUnit, setCoordinate = _a.setCoordinate;
    return (React.createElement(CircleRoot, null,
        React.createElement(point_editor_1.default, { lat: lat, lon: lon, unit: coordinateUnit, setCoordinate: setCoordinate }),
        React.createElement(InputGroup, null,
            React.createElement(Label, null, "Radius"),
            React.createElement(length_editor_1.default, { length: radius, unit: radiusUnit, setUnit: setRadiusUnit, setLength: setRadius }))));
};
exports.CircleEditor = CircleEditor;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=point-circle-editor.js.map