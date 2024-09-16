"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utmToString = void 0;
var usng_js_1 = require("usng.js");
var UnitConverter = new usng_js_1.Converter();
var utmToString = function (_a) {
    var easting = _a.easting, northing = _a.northing, zone = _a.zone, hemisphere = _a.hemisphere;
    return UnitConverter.serializeUTMUPS({
        easting: easting,
        northing: northing,
        zoneNumber: zone,
        northPole: hemisphere === 'N',
    });
};
exports.utmToString = utmToString;
//# sourceMappingURL=utm-formatting.js.map