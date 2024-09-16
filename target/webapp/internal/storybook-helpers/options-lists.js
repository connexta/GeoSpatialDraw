"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shapeList = exports.lengthUnitList = exports.coordinateUnitList = void 0;
var geometry_1 = require("../../geometry");
var coordinate_editor_1 = require("../../coordinate-editor");
var coordinateUnitList = [coordinate_editor_1.LAT_LON, coordinate_editor_1.LAT_LON_DMS, coordinate_editor_1.USNG, coordinate_editor_1.UTM];
exports.coordinateUnitList = coordinateUnitList;
var lengthUnitList = [geometry_1.KILOMETERS, geometry_1.METERS, geometry_1.MILES, geometry_1.NAUTICAL_MILES, geometry_1.YARDS, geometry_1.FEET];
exports.lengthUnitList = lengthUnitList;
var shapeList = ['Line', 'Polygon', 'Bounding Box', 'Point Radius', 'Point'];
exports.shapeList = shapeList;
//# sourceMappingURL=options-lists.js.map