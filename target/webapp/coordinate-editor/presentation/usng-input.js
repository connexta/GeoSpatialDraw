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
var styled_components_1 = require("styled-components");
var usng_js_1 = require("usng.js");
var TextInput = styled_components_1.default.input(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 12em;\n"], ["\n  width: 12em;\n"])));
TextInput.displayName = 'TextInput';
var USNGInput = /** @class */ (function (_super) {
    __extends(USNGInput, _super);
    function USNGInput(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            value: '',
        };
        _this.unitConverter = new usng_js_1.Converter();
        return _this;
    }
    USNGInput.prototype.componentDidMount = function () {
        var value = this.props.value;
        if (this.state.value !== value) {
            this.setState({ value: value });
        }
    };
    USNGInput.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.value !== this.props.value &&
            this.props.value !== this.state.value) {
            this.setState({ value: this.props.value });
        }
    };
    USNGInput.prototype.render = function () {
        var _this = this;
        var _a = this.props, onChange = _a.onChange, rest = __rest(_a, ["onChange"]);
        return (React.createElement(TextInput, __assign({ type: "text" }, rest, { value: this.state.value, onChange: function (_a) {
                var value = _a.currentTarget.value;
                _this.setState({ value: value });
            }, onBlur: function () {
                var value = _this.state.value;
                if (_this.unitConverter.isUSNG(value) !== 0) {
                    onChange(value);
                }
            } })));
    };
    return USNGInput;
}(React.Component));
exports.default = USNGInput;
var templateObject_1;
//# sourceMappingURL=usng-input.js.map