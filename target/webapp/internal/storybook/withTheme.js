"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styled_components_1 = require("styled-components");
var themes_1 = require("./themes");
require("./fonts.css");
var select = require('@connexta/ace/@storybook/addon-knobs').select;
var Table = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  min-height: 100vh;\n  min-width: 100vw;\n  display: flex;\n  flex-direction: column;\n  font-size: 14pt;\n  font-family: 'Open Sans', arial, sans-serif;\n"], ["\n  min-height: 100vh;\n  min-width: 100vw;\n  display: flex;\n  flex-direction: column;\n  font-size: 14pt;\n  font-family: 'Open Sans', arial, sans-serif;\n"])));
var TableColumn = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  flex: 1;\n  flex-direction: row;\n"], ["\n  display: flex;\n  flex: 1;\n  flex-direction: row;\n"])));
var TableData = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  padding: 20px;\n  box-sizing: border-box;\n  flex: 1;\n  background: ", ";\n"], ["\n  padding: 20px;\n  box-sizing: border-box;\n  flex: 1;\n  background: ", ";\n"])), function (props) { return props.theme.backgroundContent; });
var withTheme = function (story) {
    var colors = select('Color Scheme', {
        Dark: ['dark'],
        Light: ['light'],
        Sea: ['sea'],
        All: ['dark', 'light', 'sea'],
    }, ['dark']);
    var spacing = select('Spacing', {
        Comfortable: ['comfortable'],
        Cozy: ['cozy'],
        Compact: ['compact'],
        All: ['comfortable', 'cozy', 'compact'],
    }, ['comfortable']);
    var el = story();
    return (React.createElement(Table, null,
        React.createElement("style", null, 'body {margin: 0;}'),
        colors.map(function (c) {
            return (React.createElement(TableColumn, null, spacing.map(function (s) {
                var theme = (0, themes_1.default)({ colors: c, spacing: s });
                return (React.createElement(styled_components_1.ThemeProvider, { theme: theme },
                    React.createElement(TableData, null, el)));
            })));
        })));
};
exports.default = withTheme;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=withTheme.js.map