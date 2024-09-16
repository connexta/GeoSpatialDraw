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
import * as coordinates from './coordinate-editor';
import * as drawing from './drawing-controls';
import _DrawingMenu from './drawing-menu';
import * as geometry from './geometry';
import _Renderer from './renderer';
import * as shapes from './shape-utils';
export declare namespace renderer {
    const Renderer: typeof _Renderer;
}
export declare namespace menu {
    const DrawingMenu: typeof _DrawingMenu;
}
export { coordinates, drawing, geometry, shapes };
