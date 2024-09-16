"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DECIMAL_DEGREES_PRECISION = exports.USNG_CONVERSION_PRECISION = exports.latLonTo = void 0;
var dms_formatting_1 = require("./dms-formatting");
var usng_js_1 = require("usng.js");
var DECIMAL_DEGREES_PRECISION = 6;
exports.DECIMAL_DEGREES_PRECISION = DECIMAL_DEGREES_PRECISION;
var USNG_CONVERSION_PRECISION = 6;
exports.USNG_CONVERSION_PRECISION = USNG_CONVERSION_PRECISION;
var UnitConverter = new usng_js_1.Converter();
var latLonTo = {
    LatLonDD: function (lat, lon) { return ({
        lat: lat,
        lon: lon,
    }); },
    LatLonDMS: function (lat, lon) { return ({
        lat: (0, dms_formatting_1.decimalToDMS)(lat),
        lon: (0, dms_formatting_1.decimalToDMS)(lon),
    }); },
    USNGBox: function (north, south, east, west) {
        return UnitConverter.LLBboxtoUSNG(north, south, east, west);
    },
    USNG: function (lat, lon, precision) {
        // Note: LLtoUSNG throws and error for 90 lat and 180 lon.
        return UnitConverter.LLtoUSNG(lat === 90 ? 0 : lat, lon === 180 ? 0 : lon, precision);
    },
    UTM: function (lat, lon) {
        var _a = UnitConverter.LLtoUTMUPSObject(lat, lon), easting = _a.easting, northing = _a.northing, zoneNumber = _a.zoneNumber, northPole = _a.northPole;
        return {
            easting: easting,
            northing: northing,
            zone: zoneNumber,
            hemisphere: northPole ? 'N' : 'S',
        };
    },
};
exports.latLonTo = latLonTo;
//# sourceMappingURL=coordinate-converter.js.map