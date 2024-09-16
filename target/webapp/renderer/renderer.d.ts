import * as ol from 'openlayers';
import { GeometryJSON, Extent } from '../geometry';
/**
 * Renders Renderable objects on an Open Layers Map
 */
declare class Renderer {
    private map;
    private vectorLayer;
    private geoFormat;
    private maxZoom;
    private bufferCache;
    /**
     * Constructs renderer
     * @param map - Open Layers map to render to
     * @param style - style to apply to rendered geometries
     * @param maxZoom - maximum zoom to allow when panning on map
     */
    constructor(map: ol.Map, style: ol.style.Style | ol.StyleFunction | ol.style.Style[], maxZoom: number);
    /**
     * Renders array of GeometryJSON objects
     * @param geometryList - array of geometry JSON
     */
    renderList(geometryList: GeometryJSON[]): void;
    private getBufferedGeo;
    private makeGeometryFeature;
    /**
     * Renders a GeometryJSON object
     * @param geometry - GeometryJSON object
     */
    addGeo(geometry: GeometryJSON): void;
    /**
     * Removes all rendered geometry
     */
    clearGeos(): void;
    /**
     * Pans to GeometryJSON
     * @param geometry - GeometryJSON
     */
    panToGeo(geometry: GeometryJSON): void;
    /**
     * Pans to array of GeometryJSON
     * @param geometryList - array of geometry JSON
     */
    panToGeoList(geometryList: GeometryJSON[]): void;
    /**
     * Pans to extent
     * @param extent - Extent
     */
    panToExtent(extent: Extent): void;
    getExtent(geometry: GeometryJSON): Extent;
    /**
     * Resizes map after the map container has changed size
     */
    resizeMap(): void;
}
export default Renderer;
