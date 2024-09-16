"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extentToBBox = exports.bboxToExtent = void 0;
var bboxToExtent = function (_a) {
    var west = _a.west, south = _a.south, east = _a.east, north = _a.north;
    return [
        west,
        south,
        east,
        north,
    ];
};
exports.bboxToExtent = bboxToExtent;
var extentToBBox = function (_a) {
    var west = _a[0], south = _a[1], east = _a[2], north = _a[3];
    return ({
        west: west,
        south: south,
        east: east,
        north: north,
    });
};
exports.extentToBBox = extentToBBox;
//# sourceMappingURL=bbox-editor-props.js.map