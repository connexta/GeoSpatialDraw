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
exports.LineEditorDialog = exports.LineGeoEditor = void 0;
var React = require("react");
var geo_editor_to_dialog_1 = require("./geo-editor-to-dialog");
var flat_coordinate_list_geo_editor_1 = require("./flat-coordinate-list-geo-editor");
var finalizeGeo = function (geo) { return geo; };
var LineGeoEditor = function (props) { return (React.createElement(flat_coordinate_list_geo_editor_1.FlatCoordinateListGeoEditor, __assign({}, props, { getCoordinatesFromGeo: function (geo) {
        var coordinates = geo.geometry
            .coordinates;
        return coordinates.length < 1 ? [[0, 0]] : coordinates;
    }, updateGeoCoordinates: function (geo, coordinates) {
        var updated = __assign({}, geo);
        if (coordinates.length < 1) {
            coordinates = [[0, 0]];
        }
        var lineGeo = geo.geometry;
        lineGeo.coordinates = coordinates;
        return updated;
    } }))); };
exports.LineGeoEditor = LineGeoEditor;
var LineEditorDialog = (0, geo_editor_to_dialog_1.geoEditorToDialog)(LineGeoEditor, 'Line', finalizeGeo);
exports.LineEditorDialog = LineEditorDialog;
LineEditorDialog.displayName = 'LineEditorDialog';
//# sourceMappingURL=line-editor-dialog.js.map