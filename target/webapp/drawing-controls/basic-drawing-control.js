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
var ol = require("openlayers");
var geometry_1 = require("../geometry");
var BasicDrawingControl = /** @class */ (function () {
    function BasicDrawingControl(context, receiver) {
        this.context = context;
        this.receiver = receiver;
        this.geoFormat = new ol.format.GeoJSON();
        this.mouseDragActive = false;
        this.drawingActive = false;
        this.setProperties((0, geometry_1.makeEmptyGeometry)('', this.getShape()).properties);
    }
    BasicDrawingControl.prototype.setProperties = function (properties) {
        this.properties = __assign(__assign({}, properties), { shape: this.getShape() });
    };
    BasicDrawingControl.prototype.getProperties = function () {
        return this.properties;
    };
    BasicDrawingControl.prototype.applyPropertiesToFeature = function (feature) {
        var _this = this;
        if (this.properties.id) {
            feature.setId(this.properties.id);
        }
        Object.keys(this.properties).forEach(function (key) {
            if (key !== 'id') {
                feature.set(key, _this.properties[key]);
            }
        });
    };
    BasicDrawingControl.prototype.featureToGeo = function (feature) {
        // @ts-ignore openlayers GeoJSON type incompatibility
        return this.geoFormat.writeFeatureObject(feature);
    };
    BasicDrawingControl.prototype.writeExtendedGeoJSON = function (feature) {
        var shape = this.getShape();
        var geo = this.featureToGeo(feature);
        var bufferedGeo = (0, geometry_1.makeBufferedGeo)(__assign(__assign({}, geo), { properties: __assign(__assign({}, geo.properties), { shape: shape }) }));
        return __assign(__assign({}, geo), { bbox: (0, geometry_1.geoToExtent)(bufferedGeo), properties: __assign(__assign({}, this.properties), { shape: shape }) });
    };
    BasicDrawingControl.prototype.cancelDrawing = function () {
        this.context.removeListeners();
        this.context.removeInteractions();
        this.drawingActive = false;
    };
    BasicDrawingControl.prototype.setActive = function (active) {
        this.context.setInteractionsActive(active);
    };
    BasicDrawingControl.prototype.isActive = function () {
        return this.context.areInteractionsActive();
    };
    BasicDrawingControl.prototype.isMouseDragActive = function () {
        return this.mouseDragActive;
    };
    BasicDrawingControl.prototype.isDrawing = function () {
        return this.drawingActive;
    };
    BasicDrawingControl.prototype.updateBuffer = function (buffer, bufferUnit) {
        // no buffer applied to basic drawings
        console.debug(buffer);
        console.debug(bufferUnit);
    };
    return BasicDrawingControl;
}());
exports.default = BasicDrawingControl;
//# sourceMappingURL=basic-drawing-control.js.map