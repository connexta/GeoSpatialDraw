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
var ol = require("openlayers");
var styled_components_1 = require("styled-components");
var Root = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  margin: 0;\n  padding: 0;\n"], ["\n  display: flex;\n  flex-direction: column;\n  margin: 0;\n  padding: 0;\n"])));
var MapContainer = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  margin: 0;\n  padding: 0;\n"], ["\n  display: flex;\n  margin: 0;\n  padding: 0;\n"])));
var MapDiv = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width: 900px;\n  height: 500px;\n"], ["\n  width: 900px;\n  height: 500px;\n"])));
var renderChildren = function (children, map) {
    return React.Children.map(children, function (child) {
        // @ts-ignore (`yarn test` doesn't like this)
        return React.isValidElement(child) ? React.cloneElement(child, { map: map }) : null;
    });
};
var Map = /** @class */ (function (_super) {
    __extends(Map, _super);
    function Map(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            map: null,
            id: 'id' + Math.random(),
        };
        return _this;
    }
    Map.prototype.componentDidMount = function () {
        var map = new ol.Map({
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM(),
                }),
            ],
            target: this.state.id,
            view: new ol.View({
                center: [0, 0],
                zoom: 2,
                projection: this.props.projection,
                rotation: 0,
            }),
        });
        this.setState({ map: map });
    };
    Map.prototype.render = function () {
        var _a = this.state, id = _a.id, map = _a.map;
        var children = this.props.children;
        return (React.createElement(Root, null,
            map === null ? null : renderChildren(children, map),
            React.createElement(MapContainer, null,
                React.createElement(MapDiv, { id: id, className: "map" }))));
    };
    return Map;
}(React.Component));
exports.default = Map;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=map.js.map