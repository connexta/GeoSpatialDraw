"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECONDS_PRECISION = exports.dmsSetSign = exports.dmsSign = exports.decimalToDMS = exports.dmsToDecimal = exports.dmsCoordinateToString = exports.dmsValueToString = void 0;
var SECONDS_PRECISION = 1;
exports.SECONDS_PRECISION = SECONDS_PRECISION;
var dmsValueToString = function (dms, isLongitude) {
    var _a = dmsSetSign(dms, 1), degree = _a.degree, minute = _a.minute, second = _a.second;
    var heading = dmsSign(dms) < 0 ? (isLongitude ? 'W' : 'S') : isLongitude ? 'E' : 'N';
    return "".concat(degree.toFixed(0), "\u00B0 ").concat(minute.toFixed(0), "' ").concat(second.toFixed(SECONDS_PRECISION), "\" ").concat(heading);
};
exports.dmsValueToString = dmsValueToString;
var dmsCoordinateToString = function (lat, lon) {
    return "".concat(dmsValueToString(lat, false), " ").concat(dmsValueToString(lon, true));
};
exports.dmsCoordinateToString = dmsCoordinateToString;
var dmsToDecimal = function (_a) {
    var degree = _a.degree, minute = _a.minute, second = _a.second;
    return (Math.abs(degree) + Math.abs(minute) / 60.0 + Math.abs(second) / 3600.0) *
        dmsSign({ degree: degree, minute: minute, second: second });
};
exports.dmsToDecimal = dmsToDecimal;
var decimalToDMS = function (decimal) {
    var absoluteValue = Math.abs(decimal);
    var degree = Math.floor(absoluteValue);
    var minute = Math.floor((absoluteValue - degree) * 60);
    var second = (absoluteValue - degree - minute / 60) * 3600;
    var sign = decimal < 0 ? -1 : 1;
    return {
        degree: degree * sign,
        minute: minute,
        second: second,
    };
};
exports.decimalToDMS = decimalToDMS;
var dmsSign = function (_a) {
    var degree = _a.degree, minute = _a.minute, second = _a.second;
    return degree < 0 || minute < 0 || second < 0 ? -1 : 1;
};
exports.dmsSign = dmsSign;
var dmsSetSign = function (_a, sign) {
    var degree = _a.degree, minute = _a.minute, second = _a.second;
    return ({
        degree: Math.abs(degree) * sign,
        minute: Math.abs(minute) * sign,
        second: Math.abs(second) * sign,
    });
};
exports.dmsSetSign = dmsSetSign;
//# sourceMappingURL=dms-formatting.js.map