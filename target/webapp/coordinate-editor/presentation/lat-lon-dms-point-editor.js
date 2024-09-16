"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var dms_formatting_1 = require("../dms-formatting");
var dms_value_editor_1 = require("./dms-value-editor");
var Common = require("./common-styles");
var Root = Common.Column;
var TextGroup = Common.SpacedInputLabelRow;
var Label = Common.Label;
var LatLonDMSPointEditor = function (_a) {
    var lat = _a.lat, lon = _a.lon, setCoordinate = _a.setCoordinate;
    var dmsLat = (0, dms_formatting_1.decimalToDMS)(lat);
    var dmsLon = (0, dms_formatting_1.decimalToDMS)(lon);
    return (React.createElement(Root, null,
        React.createElement(TextGroup, null,
            React.createElement(Label, null, "Latitude"),
            React.createElement(dms_value_editor_1.DMSLatitudeEditor, { value: dmsLat, setValue: function (value) {
                    var decimalValue = (0, dms_formatting_1.dmsToDecimal)(value);
                    setCoordinate(decimalValue, lon);
                } })),
        React.createElement(TextGroup, { style: { marginBottom: 0 } },
            React.createElement(Label, null, "Longitude"),
            React.createElement(dms_value_editor_1.DMSLongitudeEditor, { value: dmsLon, setValue: function (value) {
                    var decimalValue = (0, dms_formatting_1.dmsToDecimal)(value);
                    setCoordinate(lat, decimalValue);
                } }))));
};
exports.default = LatLonDMSPointEditor;
//# sourceMappingURL=lat-lon-dms-point-editor.js.map