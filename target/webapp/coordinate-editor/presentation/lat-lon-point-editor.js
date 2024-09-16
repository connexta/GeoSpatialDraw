"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var lat_lon_input_1 = require("./lat-lon-input");
var Common = require("./common-styles");
var Root = Common.Column;
var TextGroup = Common.SpacedInputLabelRow;
var Label = Common.Label;
var LatLonPointEditor = function (_a) {
    var lat = _a.lat, lon = _a.lon, setCoordinate = _a.setCoordinate;
    return (React.createElement(Root, null,
        React.createElement(TextGroup, null,
            React.createElement(Label, null, "Latitude"),
            React.createElement(lat_lon_input_1.LatitudeInput, { value: lat, onChange: function (value) { return setCoordinate(value, lon); } })),
        React.createElement(TextGroup, { style: { marginBottom: 0 } },
            React.createElement(Label, null, "Longitude"),
            React.createElement(lat_lon_input_1.LongitudeInput, { value: lon, onChange: function (value) { return setCoordinate(lat, value); } }))));
};
exports.default = LatLonPointEditor;
//# sourceMappingURL=lat-lon-point-editor.js.map