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
exports.CircleGeoEditor = exports.CircleEditorDialog = void 0;
var React = require("react");
var geo_editor_to_dialog_1 = require("./geo-editor-to-dialog");
var point_circle_editor_1 = require("../presentation/point-circle-editor");
var circle_geo_writer_1 = require("../circle-geo-writer");
var finalizeGeo = function (geo) { return geo; };
var CircleGeoEditor = /** @class */ (function (_super) {
    __extends(CircleGeoEditor, _super);
    function CircleGeoEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CircleGeoEditor.prototype.render = function () {
        var _a = this.props, geo = _a.geo, coordinateUnit = _a.coordinateUnit, onUpdateGeo = _a.onUpdateGeo;
        var lon = geo.geometry.coordinates[0];
        var lat = geo.geometry.coordinates[1];
        var radius = geo.properties.buffer || 0;
        var radiusUnit = geo.properties.bufferUnit;
        return (React.createElement(point_circle_editor_1.CircleEditor, { coordinateUnit: coordinateUnit, lat: lat, lon: lon, radius: radius, radiusUnit: radiusUnit, setCoordinate: function (latValue, lonValue) {
                onUpdateGeo((0, circle_geo_writer_1.updateCircleGeo)(geo, latValue, lonValue, radius, radiusUnit));
            }, setRadius: function (value) {
                onUpdateGeo((0, circle_geo_writer_1.updateCircleGeo)(geo, lat, lon, value, radiusUnit));
            }, setRadiusUnit: function (value) {
                onUpdateGeo((0, circle_geo_writer_1.updateCircleGeo)(geo, lat, lon, radius, value));
            } }));
    };
    return CircleGeoEditor;
}(React.Component));
exports.CircleGeoEditor = CircleGeoEditor;
var CircleEditorDialog = (0, geo_editor_to_dialog_1.geoEditorToDialog)(CircleGeoEditor, 'Point Radius', finalizeGeo);
exports.CircleEditorDialog = CircleEditorDialog;
CircleEditorDialog.displayName = 'CircleEditorDialog';
//# sourceMappingURL=circle-editor-dialog.js.map