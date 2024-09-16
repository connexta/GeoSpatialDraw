"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POLYGON_LINE_BUFFER_PROPERTY_VALUE = exports.DEFAULT_PROPERTIES = exports.DEFAULT_GEOMETRY = exports.CIRCLE_BUFFER_PROPERTY_VALUE = exports.BUFFER_SHAPE_PROPERTY = void 0;
var units_1 = require("./units");
var DEFAULT_PROPERTIES = {
    shape: 'Polygon',
    id: '',
    color: '#996600',
    buffer: 0,
    bufferUnit: units_1.METERS,
};
exports.DEFAULT_PROPERTIES = DEFAULT_PROPERTIES;
var DEFAULT_POLYGON = {
    type: 'Polygon',
    coordinates: [[[0, 0]]],
};
var DEFAULT_POINT = {
    type: 'Point',
    coordinates: [0, 0],
};
var DEFAULT_GEOMETRY = {
    Polygon: DEFAULT_POLYGON,
    'Bounding Box': DEFAULT_POLYGON,
    'Point Radius': DEFAULT_POINT,
    Line: {
        type: 'LineString',
        coordinates: [[0, 0]],
    },
    Point: DEFAULT_POINT,
};
exports.DEFAULT_GEOMETRY = DEFAULT_GEOMETRY;
/**
 * BUFFER_SHAPE_PROPERTY value for circle buffer geometry
 */
var CIRCLE_BUFFER_PROPERTY_VALUE = 'circle';
exports.CIRCLE_BUFFER_PROPERTY_VALUE = CIRCLE_BUFFER_PROPERTY_VALUE;
/**
 * BUFFER_SHAPE_PROPERTY value for polygon and line buffer geometry
 */
var POLYGON_LINE_BUFFER_PROPERTY_VALUE = 'polygon/line';
exports.POLYGON_LINE_BUFFER_PROPERTY_VALUE = POLYGON_LINE_BUFFER_PROPERTY_VALUE;
/**
 * The BUFFER_SHAPE_PROPERTY is set in
 * GeometryJSON to identify buffered geometry for use
 * in dynamic styles.
 */
var BUFFER_SHAPE_PROPERTY = 'bufferShape';
exports.BUFFER_SHAPE_PROPERTY = BUFFER_SHAPE_PROPERTY;
//# sourceMappingURL=geometry.js.map