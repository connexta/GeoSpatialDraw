"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var compact = {
    minimumButtonSize: 1.8,
    minimumLineSize: 1.5,
    minimumSpacing: 0.3,
};
var comfortable = {
    minimumButtonSize: 2.75,
    minimumLineSize: 1.875,
    minimumSpacing: 0.625,
};
var cozy = Object.keys(comfortable).reduce(function (result, key) {
    result[key] = (comfortable[key] + compact[key]) / 2;
    return result;
}, {});
var spacings = { compact: compact, cozy: cozy, comfortable: comfortable };
var base = {
    //sizing
    borderRadius: '1px',
    //screensizes
    minimumScreenSize: '20rem', //320px
    mobileScreenSize: '26.25rem', //420px
    smallScreenSize: '58.75rem', //940px
    mediumScreenSize: '90rem', // 1440px
    //z-indexes
    zIndexMenubar: 101,
    zIndexLightbox: 101,
    zIndexLoadingCompanion: 101,
    zIndexSlideout: 103,
    zIndexContent: 101,
    zIndexConfirmation: 103,
    zIndexHelp: 104,
    zIndexVerticalMenu: 101,
    zIndexDropdown: 103,
    zIndexMenuItem: 102,
    zIndexBlocking: 105,
    //transitions
    transitionTime: '0s',
    coreTransitionTime: '0.25s',
    //font sizes
    minimumFontSize: '0.75rem',
    mediumFontSize: '1rem',
    largeFontSize: '1.25rem',
    //spacing
    mediumSpacing: '1.25rem',
    largeSpacing: '1.875rem',
    //dividers.
    dividerHeight: '0.0625rem',
    minimumDividerSize: '1.3125rem',
    //opacity
    minimumOpacity: 0.6,
};
var dark = {
    //color palette
    primaryColor: '#32a6ad',
    positiveColor: '#5b963e',
    negativeColor: '#943838',
    warningColor: '#decd39',
    favoriteColor: '#d1d179',
    //color usage
    backgroundNavigation: '#213137',
    backgroundAccentContent: '#34434c',
    backgroundDropdown: '#253540',
    backgroundContent: '#253540',
    backgroundModal: '#253540',
    backgroundSlideout: '#435059',
};
var light = {
    //color palette
    primaryColor: '#3c6dd5',
    positiveColor: '#428442',
    negativeColor: '#8a423c',
    warningColor: '#c89600',
    favoriteColor: '#d1d179',
    //color usage
    backgroundNavigation: '#3c6dd5',
    backgroundAccentContent: '#edf9fc',
    backgroundDropdown: '#f3fdff',
    backgroundContent: '#f3fdff',
    backgroundModal: '#edf9fc',
    backgroundSlideout: '#edf9fc',
};
var sea = {
    //color palette
    primaryColor: '#32a6ad',
    positiveColor: '#154e7d',
    negativeColor: '#a32c00',
    warningColor: '#b65e1f',
    favoriteColor: '#709e33',
    //color usage
    backgroundNavigation: '#0f3757',
    backgroundAccentContent: '#ffffff',
    backgroundDropdown: '#ffffff',
    backgroundContent: '#ffffff',
    backgroundModal: '#e5e6e6',
    backgroundSlideout: '#e5e6e6',
};
var themes = { dark: dark, light: light, sea: sea };
var addUnits = function (spacing) {
    return Object.keys(spacing).reduce(function (result, key) {
        result[key] = spacing[key] + 'rem';
        return result;
    }, {});
};
var defaultOptions = {
    colors: 'dark',
    spacing: 'comfortable',
};
exports.default = (function (options) {
    if (options === void 0) { options = defaultOptions; }
    var colors = options.colors, spacing = options.spacing;
    return __assign(__assign(__assign({}, base), themes[colors]), addUnits(spacings[spacing]));
});
//# sourceMappingURL=themes.js.map