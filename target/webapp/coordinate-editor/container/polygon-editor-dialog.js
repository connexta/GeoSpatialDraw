"use strict";
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
exports.PolygonEditorDialog = exports.PolygonGeoEditor = void 0;
var React = require("react");
var geo_editor_to_dialog_1 = require("./geo-editor-to-dialog");
var flat_coordinate_list_geo_editor_1 = require("./flat-coordinate-list-geo-editor");
var MIN_POLYGON_COORDINATE_LENGTH = 2;
var finalizeGeo = function (geo) { return geo; };
var PolygonGeoEditor = function (props) { return (React.createElement(flat_coordinate_list_geo_editor_1.FlatCoordinateListGeoEditor, __assign({}, props, { getCoordinatesFromGeo: function (geo) {
        var coordinates = geo.geometry
            .coordinates[0];
        return coordinates.length < MIN_POLYGON_COORDINATE_LENGTH
            ? [[0, 0]]
            : coordinates.slice(0, coordinates.length - 1);
    }, updateGeoCoordinates: function (geo, coordinates) {
        var updated = __assign({}, geo);
        if (coordinates.length < 1) {
            coordinates = [[0, 0]];
        }
        coordinates.push(coordinates[0]);
        var polyGeo = geo.geometry;
        polyGeo.coordinates = [coordinates];
        return updated;
    } }))); };
exports.PolygonGeoEditor = PolygonGeoEditor;
var PolygonEditorDialog = (0, geo_editor_to_dialog_1.geoEditorToDialog)(PolygonGeoEditor, 'Polygon', finalizeGeo);
exports.PolygonEditorDialog = PolygonEditorDialog;
PolygonEditorDialog.displayName = 'PolygonEditorDialog';
//# sourceMappingURL=polygon-editor-dialog.js.map