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
exports.finalizeGeo = exports.updateGeoWithExtentBBox = exports.BBoxEditorDialog = exports.BBoxGeoEditor = void 0;
var React = require("react");
var bbox_editor_1 = require("./bbox-editor");
var bbox_editor_props_1 = require("../bbox-editor-props");
var geo_editor_to_dialog_1 = require("./geo-editor-to-dialog");
var updateGeoWithExtentBBox = function (geo, extent) {
    var _a = (0, bbox_editor_props_1.extentToBBox)(extent), north = _a.north, south = _a.south, east = _a.east, west = _a.west;
    var coordinates = [
        [
            [west, south],
            [west, north],
            [east, north],
            [east, south],
            [west, south],
        ],
    ];
    return __assign(__assign({}, geo), { bbox: extent, geometry: __assign(__assign({}, geo.geometry), { coordinates: coordinates }) });
};
exports.updateGeoWithExtentBBox = updateGeoWithExtentBBox;
var finalizeGeo = function (geo) {
    var _a = (0, bbox_editor_props_1.extentToBBox)(geo.bbox), north = _a.north, south = _a.south, east = _a.east, west = _a.west;
    var orientationCorrectedBBox = [
        Math.min(east, west),
        Math.min(north, south),
        Math.max(east, west),
        Math.max(north, south),
    ];
    return updateGeoWithExtentBBox(geo, orientationCorrectedBBox);
};
exports.finalizeGeo = finalizeGeo;
/**
 * Some comment that should show up
 */
var BBoxGeoEditor = /** @class */ (function (_super) {
    __extends(BBoxGeoEditor, _super);
    function BBoxGeoEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BBoxGeoEditor.prototype.render = function () {
        var _a = this.props, geo = _a.geo, coordinateUnit = _a.coordinateUnit, onUpdateGeo = _a.onUpdateGeo;
        var extent = geo.bbox;
        return (React.createElement(bbox_editor_1.default, { setExtent: function (extent) {
                onUpdateGeo(updateGeoWithExtentBBox(geo, extent));
            }, extent: extent, unit: coordinateUnit }));
    };
    return BBoxGeoEditor;
}(React.Component));
exports.BBoxGeoEditor = BBoxGeoEditor;
var BBoxEditorDialog = (0, geo_editor_to_dialog_1.geoEditorToDialog)(BBoxGeoEditor, 'Bounding Box', finalizeGeo);
exports.BBoxEditorDialog = BBoxEditorDialog;
BBoxEditorDialog.displayName = 'BBoxEditorDialog';
//# sourceMappingURL=bbox-editor-dialog.js.map