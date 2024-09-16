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
var ol = require("openlayers");
var basic_drawing_control_1 = require("./basic-drawing-control");
var ModifiableDrawingControl = /** @class */ (function (_super) {
    __extends(ModifiableDrawingControl, _super);
    function ModifiableDrawingControl(context, receiver) {
        var _this = _super.call(this, context, receiver) || this;
        _this.onCompleteDrawing = _this.onCompleteDrawing.bind(_this);
        _this.onStartDrawing = _this.onStartDrawing.bind(_this);
        _this.onCompleteModify = _this.onCompleteModify.bind(_this);
        return _this;
    }
    ModifiableDrawingControl.prototype.getGeoJSONFromCompleteDrawEvent = function (e) {
        return this.writeExtendedGeoJSON(e.feature);
    };
    ModifiableDrawingControl.prototype.getGeoJSONFromCompleteModifyEvent = function (e) {
        return this.writeExtendedGeoJSON(e.features.getArray()[0]);
    };
    ModifiableDrawingControl.prototype.onCompleteDrawing = function (e) {
        var geoJSON = this.getGeoJSONFromCompleteDrawEvent(e);
        this.mouseDragActive = false;
        var feature = this.makeFeature(geoJSON);
        this.applyPropertiesToFeature(feature);
        this.context.updateFeature(feature);
        this.context.updateBufferFeature(feature);
        this.receiver(geoJSON);
    };
    ModifiableDrawingControl.prototype.onStartDrawing = function (_e) {
        this.mouseDragActive = true;
    };
    ModifiableDrawingControl.prototype.onStartModify = function (_e) {
        this.mouseDragActive = true;
    };
    ModifiableDrawingControl.prototype.onCompleteModify = function (e) {
        this.mouseDragActive = true;
        this.context.updateBufferFeature(e.features.getArray()[0]);
        this.receiver(this.getGeoJSONFromCompleteModifyEvent(e));
    };
    ModifiableDrawingControl.prototype.makeFeature = function (geoJSON) {
        var feature = this.geoFormat.readFeature(geoJSON);
        if (feature.getGeometry().getType() !== this.getGeoType()) {
            throw new Error("Wrong geometry type! expected ".concat(this.getGeoType(), " but got ").concat(feature
                .getGeometry()
                .getType(), " instead."));
        }
        return feature;
    };
    ModifiableDrawingControl.prototype.getStaticStyle = function (feature) {
        var style = this.context.getStyle();
        if (typeof style === 'function') {
            return style(feature, 1);
        }
        else {
            return style;
        }
    };
    ModifiableDrawingControl.prototype.getDefaultStaticStyle = function () {
        var feature = this.makeEmptyFeature();
        this.applyPropertiesToFeature(feature);
        return this.getStaticStyle(feature);
    };
    ModifiableDrawingControl.prototype.setGeo = function (geoJSON) {
        this.cancelDrawing();
        this.setProperties(geoJSON.properties || {});
        var feature = this.makeFeature(geoJSON);
        this.applyPropertiesToFeature(feature);
        this.context.updateFeature(feature);
        this.context.updateBufferFeature(feature);
        var drawInteraction = new ol.interaction.Draw({
            type: this.getGeoType(),
            style: this.getStaticStyle(feature),
        });
        this.startDrawingInteraction(drawInteraction);
    };
    ModifiableDrawingControl.prototype.startDrawing = function () {
        this.context.removeFeature();
        var drawInteraction = new ol.interaction.Draw({
            type: this.getGeoType(),
            style: this.getDefaultStaticStyle(),
        });
        this.startDrawingInteraction(drawInteraction);
    };
    ModifiableDrawingControl.prototype.updateBuffer = function (buffer, bufferUnit) {
        this.context.updateBuffer(buffer, bufferUnit);
    };
    ModifiableDrawingControl.prototype.startDrawingInteraction = function (drawInteraction) {
        this.drawingActive = true;
        this.context.setDrawInteraction(drawInteraction);
        this.context.setEvent('draw', 'drawend', this.onCompleteDrawing);
        this.context.setEvent('draw', 'drawstart', this.onStartDrawing);
        this.context.setEvent('modify', 'modifyend', this.onCompleteModify);
        this.context.setEvent('modify', 'modifystart', this.onStartModify);
        this.context.addInteractions();
    };
    return ModifiableDrawingControl;
}(basic_drawing_control_1.default));
exports.default = ModifiableDrawingControl;
//# sourceMappingURL=modifiable-drawing-control.js.map