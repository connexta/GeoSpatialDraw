import * as ol from 'openlayers';
type EventHandler = (e: any) => void;
type ListenerTarget = 'draw' | 'snap' | 'modify' | 'map';
/**
 * Open Layers drawing context provides a layer between the drawing controls
 * and the openlayers map, normalizing interactions with the openlayers map
 * accross all drawing controls.
 */
declare class DrawingContext {
    private map;
    private drawLayer;
    private bufferLayer;
    private modify;
    private snap;
    private draw;
    private listenerList;
    private style;
    private geoFormat;
    private animationFrameId;
    private updatedBuffer;
    private updatedBufferUnit;
    /**
     * Constructs an instance of the drawing context
     * @param map - reference to openlayers map
     * @param drawingStyle - drawingStyle to be used by all drawing controls
     */
    constructor({ map, drawingStyle, }: {
        map: ol.Map;
        drawingStyle: ol.style.Style | ol.StyleFunction | ol.style.Style[];
    });
    updateBuffer(buffer: number, bufferUnit: string): void;
    getStyle(): ol.style.Style | ol.StyleFunction | ol.style.Style[];
    removeFeature(): void;
    updateFeature(feature: ol.Feature): void;
    updateBufferFeature(feature: ol.Feature, animate?: boolean): void;
    protected bufferUpdateEvent(): void;
    setModifyInteraction(modify: ol.interaction.Modify): void;
    getSource(): ol.source.Vector;
    setDrawInteraction(draw: ol.interaction.Interaction): void;
    setEvent(target: ListenerTarget, event: string, handler: EventHandler): void;
    removeListener(target: ListenerTarget, event: string, handler: EventHandler): void;
    removeListeners(): void;
    addInteractions(): void;
    addInteractionsWithoutModify(): void;
    removeInteractions(): void;
    remakeInteractions(): void;
    setInteractionsActive(active: boolean): void;
    areInteractionsActive(): boolean;
    circleRadiusToMeters(radius: number): number;
}
export default DrawingContext;
