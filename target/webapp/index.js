"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shapes = exports.geometry = exports.drawing = exports.coordinates = exports.menu = exports.renderer = void 0;
/**
 * Copyright (c) Codice Foundation
 *
 * This is free software: you can redistribute it and/or modify it under the terms of the GNU Lesser
 * General Public License as published by the Free Software Foundation, either version 3 of the
 * License, or any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details. A copy of the GNU Lesser General Public License
 * is distributed along with this program and can be found at
 * <http://www.gnu.org/licenses/lgpl.html>.
 *
 **/
var coordinates = require("./coordinate-editor");
exports.coordinates = coordinates;
var drawing = require("./drawing-controls");
exports.drawing = drawing;
var drawing_menu_1 = require("./drawing-menu");
var geometry = require("./geometry");
exports.geometry = geometry;
var renderer_1 = require("./renderer");
var shapes = require("./shape-utils");
exports.shapes = shapes;
var renderer;
(function (renderer) {
    renderer.Renderer = renderer_1.default;
})(renderer || (exports.renderer = renderer = {}));
var menu;
(function (menu) {
    menu.DrawingMenu = drawing_menu_1.default;
})(menu || (exports.menu = menu = {}));
//# sourceMappingURL=index.js.map