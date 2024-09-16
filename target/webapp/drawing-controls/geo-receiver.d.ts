import { GeometryJSON } from '../geometry';
/**
 * Callback for returning GeometryJSON
 * @param geoJSON - The returned GeometryJSON
 */
type UpdatedGeoReceiver = (geoJSON: GeometryJSON) => void;
export default UpdatedGeoReceiver;
