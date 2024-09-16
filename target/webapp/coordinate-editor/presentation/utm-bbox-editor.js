"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styled_components_1 = require("styled-components");
var utm_point_editor_1 = require("./utm-point-editor");
var Common = require("./common-styles");
var Root = Common.BBoxRoot;
var PointGroup = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin: 0;\n  padding: 0;\n  font-size: ", ";\n  display: flex;\n  margin-right: ", ";\n  flex-direction: column;\n  align-items: center;\n  flex-grow: 1;\n"], ["\n  margin: 0;\n  padding: 0;\n  font-size: ", ";\n  display: flex;\n  margin-right: ", ";\n  flex-direction: column;\n  align-items: center;\n  flex-grow: 1;\n"])), function (props) { return props.theme.minimumFontSize; }, function (props) { return props.theme.minimumSpacing; });
var Label = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  margin: 0;\n  margin-bottom: ", ";\n  padding: 0;\n  font-size: ", ";\n  display: flex;\n  font-weight: bold;\n"], ["\n  margin: 0;\n  margin-bottom: ", ";\n  padding: 0;\n  font-size: ", ";\n  display: flex;\n  font-weight: bold;\n"])), function (props) { return props.theme.minimumSpacing; }, function (props) { return props.theme.minimumFontSize; });
var UTMBBoxEditor = /** @class */ (function (_super) {
    __extends(UTMBBoxEditor, _super);
    function UTMBBoxEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UTMBBoxEditor.prototype.render = function () {
        var _a = this.props, north = _a.north, south = _a.south, east = _a.east, west = _a.west, setBBox = _a.setBBox;
        return (React.createElement(Root, { flexDirection: "row" },
            React.createElement(PointGroup, null,
                React.createElement(Label, null, "Upper Left"),
                React.createElement(utm_point_editor_1.default, { lat: north, lon: west, setCoordinate: function (lat, lon) {
                        setBBox({
                            north: lat,
                            south: south,
                            east: east,
                            west: lon,
                        });
                    } })),
            React.createElement(PointGroup, null,
                React.createElement(Label, null, "Lower Right"),
                React.createElement(utm_point_editor_1.default, { lat: south, lon: east, setCoordinate: function (lat, lon) {
                        setBBox({
                            north: north,
                            south: lat,
                            east: lon,
                            west: west,
                        });
                    } }))));
    };
    return UTMBBoxEditor;
}(React.Component));
exports.default = UTMBBoxEditor;
var templateObject_1, templateObject_2;
//# sourceMappingURL=utm-bbox-editor.js.map