"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ol = require("openlayers");
var geometry_1 = require("../geometry");
var utilities_1 = require("../geometry/utilities");
/**
 * Open Layers drawing context provides a layer between the drawing controls
 * and the openlayers map, normalizing interactions with the openlayers map
 * accross all drawing controls.
 */
var DrawingContext = /** @class */ (function () {
    /**
     * Constructs an instance of the drawing context
     * @param map - reference to openlayers map
     * @param drawingStyle - drawingStyle to be used by all drawing controls
     */
    function DrawingContext(_a) {
        var map = _a.map, drawingStyle = _a.drawingStyle;
        this.bufferUpdateEvent = this.bufferUpdateEvent.bind(this);
        this.animationFrameId = 0;
        this.geoFormat = new ol.format.GeoJSON();
        this.style = drawingStyle;
        this.draw = null;
        this.listenerList = [];
        this.map = map;
        this.drawLayer = new ol.layer.Vector({
            source: new ol.source.Vector(),
            style: drawingStyle,
            zIndex: 2,
            updateWhileInteracting: true,
        });
        this.bufferLayer = new ol.layer.Vector({
            source: new ol.source.Vector(),
            style: drawingStyle,
            zIndex: 1,
        });
        this.map.addLayer(this.bufferLayer);
        this.map.addLayer(this.drawLayer);
        this.modify = new ol.interaction.Modify({
            source: this.drawLayer.getSource(),
        });
        this.snap = new ol.interaction.Snap({
            source: this.drawLayer.getSource(),
        });
    }
    DrawingContext.prototype.updateBuffer = function (buffer, bufferUnit) {
        this.updatedBuffer = buffer;
        this.updatedBufferUnit = bufferUnit;
        var featureList = this.drawLayer.getSource().getFeatures();
        if (featureList.length) {
            var feature = featureList[0];
            this.updateBufferFeature(feature);
        }
    };
    DrawingContext.prototype.getStyle = function () {
        return this.style;
    };
    DrawingContext.prototype.removeFeature = function () {
        this.drawLayer.getSource().clear();
    };
    DrawingContext.prototype.updateFeature = function (feature) {
        this.removeFeature();
        var geo = JSON.parse(this.geoFormat.writeFeature(feature));
        (0, utilities_1.adjustGeoCoordsForAntimeridian)(geo);
        var adjustedFeature = this.geoFormat.readFeature(geo);
        this.drawLayer.getSource().addFeature(adjustedFeature);
    };
    DrawingContext.prototype.updateBufferFeature = function (feature, animate) {
        if (animate === void 0) { animate = true; }
        this.bufferLayer.getSource().clear();
        var buffer = this.updatedBuffer
            ? this.updatedBuffer
            : feature.get('buffer');
        var bufferUnit = this.updatedBufferUnit
            ? this.updatedBufferUnit
            : feature.get('bufferUnit');
        if (buffer !== undefined) {
            feature.set('buffer', buffer);
            feature.set('bufferUnit', bufferUnit);
            var geo = JSON.parse(this.geoFormat.writeFeature(feature));
            (0, utilities_1.adjustGeoCoordsForAntimeridian)(geo);
            var bufferedGeo = (0, geometry_1.makeBufferedGeo)(geo);
            // Must adjust the coordinates again because buffering undoes the
            // adjustments we made above.
            (0, utilities_1.adjustGeoCoordsForAntimeridian)(bufferedGeo);
            var bufferFeature = this.geoFormat.readFeature(bufferedGeo);
            this.bufferLayer.getSource().addFeature(bufferFeature);
            if (animate) {
                this.setEvent('map', 'pointerdrag', this.bufferUpdateEvent);
            }
        }
    };
    DrawingContext.prototype.bufferUpdateEvent = function () {
        var _this = this;
        var featureList = this.drawLayer.getSource().getFeatures();
        if (featureList.length) {
            var feature_1 = featureList[0];
            this.animationFrameId = requestAnimationFrame(function () {
                _this.updateBufferFeature(feature_1);
            });
        }
    };
    DrawingContext.prototype.setModifyInteraction = function (modify) {
        this.modify = modify;
    };
    DrawingContext.prototype.getSource = function () {
        return this.drawLayer.getSource();
    };
    DrawingContext.prototype.setDrawInteraction = function (draw) {
        this.draw = draw;
    };
    DrawingContext.prototype.setEvent = function (target, event, handler) {
        var listenerTarget = this[target];
        if (listenerTarget !== null) {
            listenerTarget.on(event, handler);
            this.listenerList.push({
                target: target,
                event: event,
                handler: handler,
            });
        }
    };
    DrawingContext.prototype.removeListener = function (target, event, handler) {
        if (target === 'map') {
            this.map.un(event, handler);
        }
        else {
            var listenerTarget = this[target];
            if (listenerTarget !== null) {
                listenerTarget.un(event, handler);
            }
        }
    };
    DrawingContext.prototype.removeListeners = function () {
        for (var _i = 0, _a = this.listenerList; _i < _a.length; _i++) {
            var listener = _a[_i];
            this.removeListener(listener.target, listener.event, listener.handler);
        }
        this.listenerList = [];
        cancelAnimationFrame(this.animationFrameId);
    };
    DrawingContext.prototype.addInteractions = function () {
        if (this.draw !== null) {
            this.map.addInteraction(this.draw);
        }
        this.map.addInteraction(this.snap);
        this.map.addInteraction(this.modify);
    };
    DrawingContext.prototype.addInteractionsWithoutModify = function () {
        if (this.draw !== null) {
            this.map.addInteraction(this.draw);
        }
        this.map.addInteraction(this.snap);
    };
    DrawingContext.prototype.removeInteractions = function () {
        this.map.removeInteraction(this.modify);
        this.map.removeInteraction(this.snap);
        if (this.draw !== null) {
            this.map.removeInteraction(this.draw);
        }
        this.drawLayer.getSource().clear();
        this.bufferLayer.getSource().clear();
    };
    DrawingContext.prototype.remakeInteractions = function () {
        this.modify = new ol.interaction.Modify({
            source: this.drawLayer.getSource(),
        });
        this.snap = new ol.interaction.Snap({
            source: this.drawLayer.getSource(),
        });
    };
    DrawingContext.prototype.setInteractionsActive = function (active) {
        this.modify.setActive(active);
        this.snap.setActive(active);
        if (this.draw) {
            this.draw.setActive(active);
        }
    };
    DrawingContext.prototype.areInteractionsActive = function () {
        return ((this.draw === null || this.draw.getActive()) &&
            this.modify.getActive() &&
            this.snap.getActive());
    };
    DrawingContext.prototype.circleRadiusToMeters = function (radius) {
        return radius * this.map.getView().getProjection().getMetersPerUnit();
    };
    return DrawingContext;
}());
exports.default = DrawingContext;
//# sourceMappingURL=drawing-context.js.map