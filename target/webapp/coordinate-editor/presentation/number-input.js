"use strict";
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
var NumberInput = /** @class */ (function (_super) {
    __extends(NumberInput, _super);
    function NumberInput(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            stringValue: '',
        };
        return _this;
    }
    NumberInput.prototype.componentDidMount = function () {
        var stringValue = this.constrainedString(this.props.value);
        if (this.state.stringValue !== stringValue) {
            this.setState({ stringValue: stringValue });
        }
    };
    NumberInput.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        var value = this.constrainedString(this.props.value);
        var prevValue = this.constrainedString(prevProps.value);
        if ((prevValue !== value && value !== this.state.stringValue) ||
            prevProps.maxValue !== this.props.maxValue ||
            prevProps.minValue !== this.props.minValue ||
            prevProps.decimalPlaces !== this.props.decimalPlaces) {
            this.setState({ stringValue: value }, function () {
                var number = _this.constrainedNumber(_this.props.value);
                if (number !== _this.props.value) {
                    _this.props.onChange(number);
                }
            });
        }
    };
    NumberInput.prototype.constrainedNumber = function (value) {
        var _a = this.props, _b = _a.maxValue, maxValue = _b === void 0 ? Number.POSITIVE_INFINITY : _b, _c = _a.minValue, minValue = _c === void 0 ? Number.NEGATIVE_INFINITY : _c;
        if (value === undefined || value === null || isNaN(value)) {
            return null;
        }
        else {
            var constrained = value;
            if (maxValue !== undefined && !isNaN(maxValue)) {
                constrained = Math.min(constrained, maxValue);
            }
            if (minValue !== undefined && !isNaN(minValue)) {
                constrained = Math.max(constrained, minValue);
            }
            return constrained;
        }
    };
    NumberInput.prototype.constrainedString = function (value) {
        var decimalPlaces = this.props.decimalPlaces || 0;
        var n = this.constrainedNumber(value);
        if (n === null) {
            return '';
        }
        else {
            if (decimalPlaces === undefined || isNaN(decimalPlaces)) {
                return n.toString();
            }
            else {
                return n.toFixed(decimalPlaces);
            }
        }
    };
    NumberInput.prototype.render = function () {
        var _this = this;
        var _a = this.props, maxValue = _a.maxValue, minValue = _a.minValue, decimalPlaces = _a.decimalPlaces, onChange = _a.onChange, rest = __rest(_a, ["maxValue", "minValue", "decimalPlaces", "onChange"]);
        return (React.createElement("input", __assign({ type: "text" }, rest, { value: this.state.stringValue, onChange: function (_a) {
                var value = _a.currentTarget.value;
                _this.setState({ stringValue: value });
            }, onBlur: function () {
                var number = _this.constrainedNumber(parseFloat(_this.state.stringValue));
                var stringValue = _this.constrainedString(number);
                _this.setState({ stringValue: stringValue });
                if (number !== null) {
                    onChange(number);
                }
            } })));
    };
    return NumberInput;
}(React.Component));
exports.default = NumberInput;
//# sourceMappingURL=number-input.js.map