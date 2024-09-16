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
exports.updateCircleGeo = void 0;
var turf = require("@turf/turf");
var geometry_1 = require("../geometry");
var distance_1 = require("../internal/distance");
var updateCircleGeo = function (geo, lat, lon, radius, radiusUnit) {
    var center = [lon, lat];
    var bbox = [lon, lat, lon, lat];
    if (radius > 0) {
        var meters = (0, distance_1.getDistanceInMeters)(radius, radiusUnit);
        var circle = turf.circle(center, meters, { units: 'meters' });
        bbox = (0, geometry_1.bboxToExtent)(turf.bbox(circle));
    }
    return __assign(__assign({}, geo), { geometry: __assign(__assign({}, geo.geometry), { coordinates: center }), bbox: bbox, properties: __assign(__assign({}, geo.properties), { buffer: radius, bufferUnit: radiusUnit }) });
};
exports.updateCircleGeo = updateCircleGeo;
//# sourceMappingURL=circle-geo-writer.js.map