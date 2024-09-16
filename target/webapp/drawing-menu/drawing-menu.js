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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var styled_components_1 = require("styled-components");
var drawing_controls_1 = require("../drawing-controls");
var polished_1 = require("polished");
var bbox_1 = require("./icons/bbox");
var circle_1 = require("./icons/circle");
var line_1 = require("./icons/line");
var polygon_1 = require("./icons/polygon");
var point_1 = require("./icons/point");
var InvisibleBackground = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: none;\n"], ["\n  display: none;\n"])));
var TitleContainer = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  flex-grow: 1;\n  flex-shrink: 1;\n  height: 100%;\n  font-size: ", ";\n"], ["\n  display: flex;\n  flex-direction: row;\n  flex-grow: 1;\n  flex-shrink: 1;\n  height: 100%;\n  font-size: ", ";\n"])), function (props) { return props.theme.largeFontSize; });
var TitleLabel = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  color: ", ";\n  align-self: center;\n  padding-left: ", ";\n  padding-right: ", ";\n  flex: 0 0 auto;\n"], ["\n  color: ", ";\n  align-self: center;\n  padding-left: ", ";\n  padding-right: ", ";\n  flex: 0 0 auto;\n"])), function (props) { return (0, polished_1.readableColor)(props.theme.positiveColor); }, function (props) { return props.theme.largeSpacing; }, function (props) { return props.theme.minimumSpacing; });
var Title = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  color: ", ";\n  font-weight: bold;\n  align-self: center;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  flex: 0 1 auto;\n"], ["\n  color: ", ";\n  font-weight: bold;\n  align-self: center;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  flex: 0 1 auto;\n"])), function (props) { return (0, polished_1.readableColor)(props.theme.positiveColor); });
var ShapeMenu = styled_components_1.default.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  height: 100%;\n  display: flex;\n  border-right: 1px solid ", ";\n  border-left: 1px solid ", ";\n  font-size: ", ";\n"], ["\n  height: 100%;\n  display: flex;\n  border-right: 1px solid ", ";\n  border-left: 1px solid ", ";\n  font-size: ", ";\n"])), function (props) { return props.theme.backgroundSlideout; }, function (props) { return props.theme.backgroundSlideout; }, function (props) { return props.theme.minimumFontSize; });
var ToolMenu = styled_components_1.default.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  height: 100%;\n  display: flex;\n  font-size: ", ";\n"], ["\n  height: 100%;\n  display: flex;\n  font-size: ", ";\n"])), function (props) { return props.theme.minimumFontSize; });
var ControlsGroup = styled_components_1.default.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  height: 100%;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-direction: row;\n  align-items: right;\n  flex: 0 0 auto;\n"], ["\n  height: 100%;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-direction: row;\n  align-items: right;\n  flex: 0 0 auto;\n"])));
var Button = styled_components_1.default.div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  height: 100%;\n  font-size: ", ";\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  line-height: ", ";\n  padding: 0;\n  margin: 0;\n  opacity: ", ";\n  cursor: pointer;\n  color: ", ";\n  width: 5em;\n  background-color: ", ";\n  :hover {\n    opacity: 1;\n  }\n"], ["\n  height: 100%;\n  font-size: ", ";\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  line-height: ", ";\n  padding: 0;\n  margin: 0;\n  opacity: ", ";\n  cursor: pointer;\n  color: ", ";\n  width: 5em;\n  background-color: ", ";\n  :hover {\n    opacity: 1;\n  }\n"])), function (props) { return props.theme.largeFontSize; }, function (props) { return props.theme.minimumButtonSize; }, function (props) { return props.theme.minimumOpacity; }, function (props) { return (0, polished_1.readableColor)(props.theme[props.buttonType]); }, function (props) { return props.theme[props.buttonType]; });
var SelectableButton = styled_components_1.default.div(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: calc(", " * 1.5);\n  padding: ", ";\n  opacity: ", ";\n  cursor: pointer;\n  color: ", ";\n  border: 1px solid\n    ", ";\n  :hover {\n    opacity: 1;\n    border: 1px solid ", ";\n  }\n"], ["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: calc(", " * 1.5);\n  padding: ", ";\n  opacity: ", ";\n  cursor: pointer;\n  color: ", ";\n  border: 1px solid\n    ", ";\n  :hover {\n    opacity: 1;\n    border: 1px solid ", ";\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.largeFontSize;
}, function (_a) {
    var theme = _a.theme;
    return theme.mediumSpacing;
}, function (props) { return (props.isSelected ? 1 : props.theme.minimumOpacity); }, function (props) { return (0, polished_1.readableColor)(props.theme.positiveColor); }, function (props) {
    return props.isSelected
        ? (0, polished_1.readableColor)(props.theme.positiveColor)
        : 'transparent';
}, function (props) { return (0, polished_1.readableColor)(props.theme.positiveColor); });
var DrawingBackground = styled_components_1.default.div(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  height: 100%;\n  width: 100%;\n  max-width: 100%;\n  background-color: ", ";\n"], ["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  height: 100%;\n  width: 100%;\n  max-width: 100%;\n  background-color: ", ";\n"])), function (props) {
    return (0, polished_1.transparentize)(0.2, props.theme.positiveColor);
});
var DrawingMenu = /** @class */ (function (_super) {
    __extends(DrawingMenu, _super);
    function DrawingMenu(props) {
        var _this = _super.call(this, props) || this;
        _this.drawingContext = new drawing_controls_1.DrawingContext({
            map: _this.props.map,
            drawingStyle: props.mapStyle,
        });
        _this.controlsMap = new Map();
        _this.controlsMap.set('Polygon', new drawing_controls_1.PolygonDrawingControl(_this.drawingContext, _this.props.onUpdate));
        _this.controlsMap.set('Line', new drawing_controls_1.LineDrawingControl(_this.drawingContext, _this.props.onUpdate));
        _this.controlsMap.set('Point Radius', new drawing_controls_1.PointRadiusDrawingControl(_this.drawingContext, _this.props.onUpdate));
        _this.controlsMap.set('Point', new drawing_controls_1.PointDrawingControl(_this.drawingContext, _this.props.onUpdate));
        _this.controlsMap.set('Bounding Box', new drawing_controls_1.BoundingBoxDrawingControl(_this.drawingContext, _this.props.onUpdate));
        _this.setShape = function (shape) {
            _this.props.onSetShape(shape);
        };
        _this.acceptEdit = function () {
            _this.cancelShapeDrawing();
            _this.props.onOk();
        };
        _this.cancelClick = function () {
            _this.cancelShapeDrawing();
            _this.props.onCancel();
        };
        return _this;
    }
    DrawingMenu.prototype.drawShape = function () {
        if (this.props.isActive && this.props.shape !== null) {
            this.cancelShapeDrawing();
            var control = this.controlsMap.get(this.props.shape);
            if (control !== undefined) {
                control.startDrawing();
                if (this.props.geometry !== null) {
                    control.setGeo(this.props.geometry);
                }
            }
        }
    };
    DrawingMenu.prototype.updateBuffer = function (buffer, bufferUnit) {
        var control = this.controlsMap.get(this.props.shape);
        if (control !== undefined) {
            control.updateBuffer(buffer, bufferUnit);
        }
    };
    DrawingMenu.prototype.cancelShapeDrawing = function () {
        this.controlsMap.forEach(function (control, _shape) {
            control.cancelDrawing();
        });
    };
    DrawingMenu.prototype.setDrawingActive = function (active) {
        var control = this.controlsMap.get(this.props.shape);
        if (control !== undefined) {
            control.setActive(active);
        }
    };
    DrawingMenu.prototype.isDrawing = function () {
        var control = this.controlsMap.get(this.props.shape);
        if (control !== undefined) {
            return control.isDrawing();
        }
        return false;
    };
    DrawingMenu.prototype.componentDidMount = function () {
        if (this.props.isActive && !this.props.showCoordinateEditor) {
            this.drawShape();
        }
    };
    DrawingMenu.prototype.componentWillUnmount = function () {
        this.cancelShapeDrawing();
    };
    DrawingMenu.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.shape !== this.props.shape) {
            this.cancelShapeDrawing();
            this.drawShape();
        }
        else if (prevProps.isActive !== this.props.isActive) {
            if (this.props.isActive) {
                this.drawShape();
            }
            else {
                this.cancelShapeDrawing();
            }
        }
        if (this.isDrawing()) {
            this.setDrawingActive(this.props.showCoordinateEditor !== true);
        }
        if (this.props.showCoordinateEditor != prevProps.showCoordinateEditor &&
            this.props.showCoordinateEditor === false) {
            this.cancelShapeDrawing();
            this.drawShape();
        }
        if (this.props.updatedBuffer && this.props.updatedBufferUnit) {
            this.updateBuffer(this.props.updatedBuffer, this.props.updatedBufferUnit);
        }
    };
    DrawingMenu.prototype.renderShapeButton = function (shape, icon) {
        var _this = this;
        return this.props.disabledShapes &&
            this.props.disabledShapes.includes(shape) ? null : (React.createElement(SelectableButton, { isSelected: this.props.shape === shape, onClick: function () { return _this.setShape(shape); }, title: "Draw ".concat(shape) }, icon));
    };
    DrawingMenu.prototype.render = function () {
        var _a = this.props, shape = _a.shape, map = _a.map, isActive = _a.isActive, geometry = _a.geometry, onCancel = _a.onCancel, onOk = _a.onOk, onSetShape = _a.onSetShape, onUpdate = _a.onUpdate, title = _a.title, saveAndContinue = _a.saveAndContinue, showCoordinateEditor = _a.showCoordinateEditor, toggleCoordinateEditor = _a.toggleCoordinateEditor, rest = __rest(_a, ["shape", "map", "isActive", "geometry", "onCancel", "onOk", "onSetShape", "onUpdate", "title", "saveAndContinue", "showCoordinateEditor", "toggleCoordinateEditor"]);
        var Background = isActive ? DrawingBackground : InvisibleBackground;
        var acceptEditButton = saveAndContinue ? 'Next' : 'Apply';
        var acceptEditAlt = saveAndContinue
            ? 'Save And Continue Drawing'
            : 'Accept Edit';
        return (React.createElement(Background, __assign({}, rest),
            React.createElement(TitleContainer, null, title === undefined ? null : (React.createElement(React.Fragment, null,
                React.createElement(TitleLabel, null, "Editing Shape:"),
                React.createElement(Title, null, title)))),
            React.createElement(ControlsGroup, null,
                React.createElement(ShapeMenu, null,
                    this.renderShapeButton('Line', React.createElement(line_1.default, null)),
                    this.renderShapeButton('Polygon', React.createElement(polygon_1.default, null)),
                    this.renderShapeButton('Bounding Box', React.createElement(bbox_1.default, null)),
                    this.renderShapeButton('Point Radius', React.createElement(circle_1.default, null)),
                    this.renderShapeButton('Point', React.createElement(point_1.default, null))),
                showCoordinateEditor === undefined ||
                    toggleCoordinateEditor === undefined ? null : (React.createElement(ToolMenu, null,
                    React.createElement(SelectableButton, { isSelected: showCoordinateEditor, onClick: toggleCoordinateEditor, title: "Edit Coordinates" },
                        React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faThList, color: "white" })))),
                React.createElement(Button, { isSubmit: false, buttonType: "positiveColor", onClick: this.cancelClick, title: "Cancel Edit" }, "Cancel"),
                React.createElement(Button, { isSubmit: false, buttonType: "primaryColor", onClick: this.acceptEdit, title: acceptEditAlt }, acceptEditButton))));
    };
    return DrawingMenu;
}(React.Component));
exports.default = DrawingMenu;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
//# sourceMappingURL=drawing-menu.js.map