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
var modifiable_drawing_control_1 = require("./modifiable-drawing-control");
/**
 * Drawing Control for drawing a point
 */
var PointDrawingControl = /** @class */ (function (_super) {
    __extends(PointDrawingControl, _super);
    /**
     * Creates drawing control
     * @param context - Drawing context
     * @param receiver - callback for returning updates to GeometryJSON
     */
    function PointDrawingControl(context, receiver) {
        return _super.call(this, context, receiver) || this;
    }
    PointDrawingControl.prototype.getShape = function () {
        return 'Point';
    };
    PointDrawingControl.prototype.getGeoType = function () {
        return 'Point';
    };
    PointDrawingControl.prototype.cancelDrawing = function () {
        // the snap interaction breaks after using point drawing
        this.context.remakeInteractions();
        _super.prototype.cancelDrawing.call(this);
    };
    PointDrawingControl.prototype.makeEmptyFeature = function () {
        return new ol.Feature(new ol.geom.Point([0, 0]));
    };
    return PointDrawingControl;
}(modifiable_drawing_control_1.default));
exports.default = PointDrawingControl;
//# sourceMappingURL=point-drawing-control.js.map