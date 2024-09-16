"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDistanceFromMeters = exports.getDistanceInMeters = void 0;
var geometry_1 = require("../../geometry");
var METERS_KILOMETERS = 1000;
var METERS_FEET = 0.3048;
var METERS_YARDS = 0.9144;
var METERS_MILES = 1609.344;
var METERS_NAUTICAL_MILES = 1852;
var getDistanceInMeters = function (distance, units) {
    switch (units) {
        case geometry_1.KILOMETERS:
            return distance * METERS_KILOMETERS;
        case geometry_1.FEET:
            return distance * METERS_FEET;
        case geometry_1.YARDS:
            return distance * METERS_YARDS;
        case geometry_1.MILES:
            return distance * METERS_MILES;
        case geometry_1.NAUTICAL_MILES:
            return distance * METERS_NAUTICAL_MILES;
        case geometry_1.METERS:
        default:
            return distance;
    }
};
exports.getDistanceInMeters = getDistanceInMeters;
var getDistanceFromMeters = function (distance, units) {
    switch (units) {
        case geometry_1.KILOMETERS:
            return distance / METERS_KILOMETERS;
        case geometry_1.FEET:
            return distance / METERS_FEET;
        case geometry_1.YARDS:
            return distance / METERS_YARDS;
        case geometry_1.MILES:
            return distance / METERS_MILES;
        case geometry_1.NAUTICAL_MILES:
            return distance / METERS_NAUTICAL_MILES;
        case geometry_1.METERS:
        default:
            return distance;
    }
};
exports.getDistanceFromMeters = getDistanceFromMeters;
//# sourceMappingURL=index.js.map