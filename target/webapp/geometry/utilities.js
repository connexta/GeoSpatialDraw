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
exports.adjustGeoCoordsForAntimeridian = exports.makeEmptyGeometry = exports.makeBufferedGeo = exports.makeGeometry = exports.geoToExtent = exports.bboxToExtent = void 0;
var turf = require("@turf/turf");
var buffer_1 = require("@turf/buffer");
var _ = require("lodash");
var units_1 = require("./units");
var geometry_1 = require("./geometry");
var distance_1 = require("../internal/distance");
var MINIMUM_POLYGON_OR_LINE_COORDINATE_LENGTH_FOR_TURF_JS = 2;
/**
 * Creates a full GeometryJSON object from GeoJSON
 *
 * @param id - unique id for geometry
 * @param geometryJSON - base GeoJSON object to extend
 * @param color - CSS color for geometry
 * @param shape - geometry shape
 * @param buffer - buffer size
 * @param bufferUnit - buffer size unit of measurement
 *
 * @returns GeometryJSON
 */
var makeGeometry = function (id, geometryJSON, color, shape, buffer, bufferUnit) {
    if (buffer === void 0) { buffer = 0; }
    if (bufferUnit === void 0) { bufferUnit = units_1.METERS; }
    var geometry = turf.getGeom(_.cloneDeep(geometryJSON));
    var json = {
        type: 'Feature',
        properties: {
            id: id,
            color: color,
            shape: shape,
            buffer: buffer,
            bufferUnit: bufferUnit,
        },
        geometry: geometry,
        bbox: [0, 0, 0, 0],
    };
    json.bbox = geoToExtent(makeBufferedGeo(json));
    return json;
};
exports.makeGeometry = makeGeometry;
/**
 * Creates an empty GeometryJSON object
 *
 * @param id - unique id for geometry
 * @param shape - geometry shape
 * @param initialProperties - hash of properties to pass to new GeometryJSON
 *
 * @returns GeometryJSON
 */
var makeEmptyGeometry = function (id, shape, initialProperties) {
    if (initialProperties === void 0) { initialProperties = {}; }
    return ({
        type: 'Feature',
        properties: __assign(__assign(__assign({}, geometry_1.DEFAULT_PROPERTIES), initialProperties), { shape: shape, id: id, buffer: shape === 'Point Radius' ? Number.MIN_VALUE : 0, bufferUnit: units_1.METERS }),
        bbox: [0, 0, 0, 0],
        geometry: _.cloneDeep(geometry_1.DEFAULT_GEOMETRY[shape]),
    });
};
exports.makeEmptyGeometry = makeEmptyGeometry;
/**
 * Creates a buffered GeometryJSON object from a source
 * GeometryJSON object using it's geometry and buffer values
 *
 * @param geo - source GeometryJSON object
 *
 * @returns GeometryJSON with buffer applied
 */
var makeBufferedGeo = function (geo) {
    if (((geo.geometry.type === 'Polygon' &&
        geo.geometry.coordinates[0].length >=
            MINIMUM_POLYGON_OR_LINE_COORDINATE_LENGTH_FOR_TURF_JS) ||
        (geo.geometry.type === 'LineString' &&
            geo.geometry.coordinates.length >=
                MINIMUM_POLYGON_OR_LINE_COORDINATE_LENGTH_FOR_TURF_JS) ||
        geo.geometry.type === 'Point') &&
        geo.properties.shape !== 'Bounding Box' &&
        geo.properties.buffer &&
        geo.properties.bufferUnit &&
        geo.properties.buffer > 0) {
        // Copy JSON since turf.buffer has side effects
        geo = _.cloneDeep(geo);
        var radius = (0, distance_1.getDistanceInMeters)(geo.properties.buffer || 0, geo.properties.bufferUnit);
        var bufferedGeo = void 0;
        if (geo.geometry.type === 'Point') {
            if (radius > 0) {
                var point = geo.geometry;
                bufferedGeo = turf.circle(point.coordinates, radius, {
                    units: 'meters',
                });
                bufferedGeo = __assign(__assign({}, geo), { geometry: bufferedGeo.geometry });
            }
            else {
                bufferedGeo = geo;
            }
        }
        else {
            bufferedGeo = (0, buffer_1.default)(geo, radius, {
                units: 'meters',
            });
        }
        if (bufferedGeo === undefined) {
            return geo;
        }
        else if (bufferedGeo.properties) {
            bufferedGeo.properties[geometry_1.BUFFER_SHAPE_PROPERTY] =
                geo.geometry.type === 'Point'
                    ? geometry_1.CIRCLE_BUFFER_PROPERTY_VALUE
                    : geometry_1.POLYGON_LINE_BUFFER_PROPERTY_VALUE;
        }
        return bufferedGeo;
    }
    return geo;
};
exports.makeBufferedGeo = makeBufferedGeo;
/**
 * Converts an arbitrary bbox value from GeoJSON to a 2D extent value
 *
 * @param bbox - 2D/3D GeoJSON bbox value
 *
 * @returns Extent
 */
var bboxToExtent = function (bbox) { return [
    bbox[0],
    bbox[1],
    bbox[2],
    bbox[3],
]; };
exports.bboxToExtent = bboxToExtent;
/**
 * Calculates the 2D extent of a GeometryJSON object
 *
 * @param geo - GeometryJSON object
 *
 * @returns Extent
 */
var geoToExtent = function (geo) {
    return bboxToExtent(turf.bbox(geo));
};
exports.geoToExtent = geoToExtent;
var convertCoordsToDisplay = function (coordinates) {
    var coords = _.cloneDeep(coordinates);
    coords.forEach(function (coord) {
        if (coord[0] < 0) {
            coord[0] += 360;
        }
    });
    return coords;
};
/**
 * If the geo crosses the antimeridian, this will updates its coordinates so
 * that no longitudes are negative. Typically used before displaying a geo on
 * a map. The coordinates are updated in place.
 *
 * @param geo - GeometryJSON object
 */
var adjustGeoCoordsForAntimeridian = function (geo) {
    var geometry = geo.geometry;
    var bbox = geo.bbox || turf.bbox(geo.geometry);
    var width = Math.abs(bbox[0] - bbox[2]);
    var crossesAntimeridian = width > 180;
    if (crossesAntimeridian) {
        if (geometry.type === 'LineString') {
            var lineStringCoords = geometry.coordinates;
            geometry.coordinates = convertCoordsToDisplay(lineStringCoords);
        }
        else if (geometry.type === 'Polygon') {
            var coords = geometry.coordinates[0];
            geometry.coordinates[0] = convertCoordsToDisplay(coords);
        }
    }
};
exports.adjustGeoCoordsForAntimeridian = adjustGeoCoordsForAntimeridian;
//# sourceMappingURL=utilities.js.map