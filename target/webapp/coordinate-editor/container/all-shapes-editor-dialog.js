"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var bbox_editor_dialog_1 = require("./bbox-editor-dialog");
var circle_editor_dialog_1 = require("./circle-editor-dialog");
var line_editor_dialog_1 = require("./line-editor-dialog");
var point_editor_dialog_1 = require("./point-editor-dialog");
var polygon_editor_dialog_1 = require("./polygon-editor-dialog");
var AllShapesEditorDialog = function (_a) {
    var shape = _a.shape, geo = _a.geo, onOk = _a.onOk;
    switch (shape) {
        case 'Polygon':
            return React.createElement(polygon_editor_dialog_1.PolygonEditorDialog, { geo: geo, onOk: onOk });
        case 'Line':
            return React.createElement(line_editor_dialog_1.LineEditorDialog, { geo: geo, onOk: onOk });
        case 'Point':
            return React.createElement(point_editor_dialog_1.PointEditorDialog, { geo: geo, onOk: onOk });
        case 'Point Radius':
            return React.createElement(circle_editor_dialog_1.CircleEditorDialog, { geo: geo, onOk: onOk });
        case 'Bounding Box':
            return React.createElement(bbox_editor_dialog_1.BBoxEditorDialog, { geo: geo, onOk: onOk });
        default:
            throw new Error("Shape ".concat(shape, " is not supported!"));
    }
};
exports.default = AllShapesEditorDialog;
//# sourceMappingURL=all-shapes-editor-dialog.js.map