import { GeometryJSON } from '../geometry'

/**
 * Drawing controls create drawing interactions and provides
 * a standard for managing the life-cycle of drawing interactions to
 * facilitate use in React applications.
 */
interface DrawingControl {
  /**
   * Sets the geometry to be rendered in the drawing control allowing the user to modify an existing geometry.
   * Note: This will call startDrawing() if it hasn't already been called.
   * @param geoJSON - GeometryJSON to render
   */
  setGeo(geoJSON: GeometryJSON): void

  /**
   * Starts drawing interaction
   */
  startDrawing(): void

  /**
   * Cancels drawing interaction
   */
  cancelDrawing(): void

  /**
   * Pauses and un-pauses the drawing interaction while continuing to render the drawn geometries
   * @param active - true if the drawing interaction should be active
   */
  setActive(active: boolean): void

  /**
   * @returns true if the drawing interaction is actively listening to user input
   */
  isActive(): boolean

  /**
   * Sets properties to geometry rendered by DrawingControl
   * @param properties - hash of property values
   */
  setProperties(properties: object): void

  /**
   * @returns true if mouse movement is being tracked for a dragging event.
   */
  isMouseDragActive(): boolean

  /**
   * @returns true if the drawing interaction has been started
   */
  isDrawing(): boolean

  /**
   * Updated the buffer on the drawn location
   * @param buffer - new buffer value
   * @param bufferUnit - new bufferUnit value
   */
  updateBuffer(buffer: number, bufferUnit: string): void

}

export default DrawingControl
