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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePolygonGeo = exports.makePointRadiusGeo = exports.makePointGeo = exports.makeLineGeo = exports.makeBBoxGeo = void 0;
var turf = require("@turf/turf");
var utilities_1 = require("./utilities");
var geometry_1 = require("./geometry");
/**
 * Creates a GeometryJSON object from a GeoJSON Geometry object
 *
 * @param id - unique id for geometry
 * @param geometry - GeoJSON Geometry object
 * @param shape - geometry shape
 * @param buffer - buffer size
 * @param bufferUnit - buffer size unit of measurement
 *
 * @returns GeometryJSON
 */
var makeGeometryJSONFromGeometry = function (id, geometry, shape, buffer, bufferUnit) {
    if (buffer === void 0) { buffer = 0; }
    if (bufferUnit === void 0) { bufferUnit = geometry_1.DEFAULT_PROPERTIES.bufferUnit; }
    return (0, utilities_1.makeGeometry)(id, geometry, geometry_1.DEFAULT_PROPERTIES.color, shape, buffer, bufferUnit);
};
/**
 * Creates a Point GeometryJSON object
 *
 * @param id - unique id for geometry
 * @param lat - center lattitude
 * @param lon - center longitude
 *
 * @returns GeometryJSON
 */
var makePointGeo = function (id, lat, lon) {
    return makeGeometryJSONFromGeometry(id, {
        type: 'Point',
        coordinates: [lon, lat],
    }, 'Point');
};
exports.makePointGeo = makePointGeo;
/**
 * Creates a Point Radius GeometryJSON object
 *
 * @param id - unique id for geometry
 * @param lat - center lattitude
 * @param lon - center longitude
 * @param radius - radius length
 * @param radiusUnit - radius length unit of measurement
 *
 * @returns GeometryJSON
 */
var makePointRadiusGeo = function (id, lat, lon, radius, radiusUnit) {
    return makeGeometryJSONFromGeometry(id, {
        type: 'Point',
        coordinates: [lon, lat],
    }, 'Point Radius', radius, radiusUnit);
};
exports.makePointRadiusGeo = makePointRadiusGeo;
/**
 * Creates a Polygon GeometryJSON object
 *
 * @param id - unique id for geometry
 * @param lonLatCoordinateList - array of coordinates in the format of [[longitude, lattitude], ...]
 * @param buffer - buffer size
 * @param bufferUnit - buffer size unit of measurement
 *
 * @returns GeometryJSON
 */
var makePolygonGeo = function (id, lonLatCoordinateList, buffer, bufferUnit) {
    return makeGeometryJSONFromGeometry(id, {
        type: 'Polygon',
        coordinates: [__spreadArray(__spreadArray([], lonLatCoordinateList, true), [lonLatCoordinateList[0]], false)],
    }, 'Polygon', buffer, bufferUnit);
};
exports.makePolygonGeo = makePolygonGeo;
/**
 * Creates a Line GeometryJSON object
 *
 * @param id - unique id for geometry
 * @param lonLatCoordinateList - array of coordinates in the format of [[longitude, lattitude], ...]
 * @param buffer - buffer size
 * @param bufferUnit - buffer size unit of measurement
 *
 * @returns GeometryJSON
 */
var makeLineGeo = function (id, lonLatCoordinateList, buffer, bufferUnit) {
    return makeGeometryJSONFromGeometry(id, {
        type: 'LineString',
        coordinates: lonLatCoordinateList,
    }, 'Line', buffer, bufferUnit);
};
exports.makeLineGeo = makeLineGeo;
/**
 * Creates a Bounding Box GeometryJSON object
 *
 * @param id - unique id for geometry
 * @param extent - Extent of bounding box
 *
 * @returns GeometryJSON
 */
var makeBBoxGeo = function (id, extent) {
    return makeGeometryJSONFromGeometry(id, __assign({}, turf.bboxPolygon(extent).geometry), 'Bounding Box');
};
exports.makeBBoxGeo = makeBBoxGeo;
//# sourceMappingURL=shape-factory.js.map