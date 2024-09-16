"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ol = require("openlayers");
var turf = require("@turf/turf");
/**
 * Detects shapes of GeometryJSON objects by evaluating their geometric contents
 */
var ShapeDetector = /** @class */ (function () {
    /**
     * Constructs an instance of the ShapeDetector
     */
    function ShapeDetector() {
        this.geoFormat = new ol.format.GeoJSON();
    }
    /**
     * Gets the shape of GeometryJSON object
     * @param geoJSON - GeometryJSON object
     * @returns Shape of geometry
     */
    ShapeDetector.prototype.shapeFromGeoJSON = function (geoJSON) {
        var feature = this.geoFormat.readFeature(geoJSON);
        return this.shapeFromFeature(feature);
    };
    /**
     * Gets the shape of an Open Layers feature
     * @param feature - Open Layers feature
     * @returns Shape of geometry
     */
    ShapeDetector.prototype.shapeFromFeature = function (feature) {
        if (this.isLineFeature(feature)) {
            return 'Line';
        }
        else if (this.isBoundingBoxFeature(feature)) {
            return 'Bounding Box';
        }
        else if (this.isPointFeature(feature)) {
            return 'Point';
        }
        else if (this.isPointRadiusFeature(feature)) {
            return 'Point Radius';
        }
        else {
            return 'Polygon';
        }
    };
    /**
     * Checks if feature matches shape
     * @param feature - Open Layers feature
     * @returns true if geometry is a line
     */
    ShapeDetector.prototype.isLineFeature = function (feature) {
        return feature.getGeometry().getType() === 'LineString';
    };
    /**
     * Checks if feature matches shape
     * @param feature - Open Layers feature
     * @returns true if geometry is a point
     */
    ShapeDetector.prototype.isPointFeature = function (feature) {
        return (feature.getGeometry().getType() === 'Point' &&
            (feature.get('buffer') === undefined || feature.get('buffer') <= 0));
    };
    /**
     * Checks if feature matches shape
     * @param feature - Open Layers feature
     * @returns true if geometry is a bounding box
     */
    ShapeDetector.prototype.isBoundingBoxFeature = function (feature) {
        if (!this.isPolygonFeature(feature)) {
            return false;
        }
        else {
            var coordinates_1 = feature.getGeometry().getCoordinates()[0];
            var extent = feature.getGeometry().getExtent();
            var expectedCoordinates = turf.bboxPolygon(extent).geometry.coordinates[0];
            return (coordinates_1.length === 5 &&
                expectedCoordinates.every(function (expectedPoint) {
                    return coordinates_1.some(function (point) {
                        return point[0] === expectedPoint[0] && point[1] === expectedPoint[1];
                    });
                }));
        }
    };
    /**
     * Checks if feature matches shape
     * @param feature - Open Layers feature
     * @returns true if geometry is a point radius
     */
    ShapeDetector.prototype.isPointRadiusFeature = function (feature) {
        return (feature.getGeometry().getType() === 'Point' && feature.get('buffer') > 0);
    };
    /**
     * Checks if feature matches shape
     * @param feature - Open Layers feature
     * @returns true if geometry is a polygon
     */
    ShapeDetector.prototype.isPolygonFeature = function (feature) {
        return feature.getGeometry().getType() === 'Polygon';
    };
    return ShapeDetector;
}());
exports.default = ShapeDetector;
//# sourceMappingURL=shape-detector.js.map