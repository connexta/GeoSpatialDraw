import { DMS, decimalToDMS } from './dms-formatting'
import { UTM } from './utm-formatting'
import { Converter } from 'usng.js'

const DECIMAL_DEGREES_PRECISION = 6
const USNG_CONVERSION_PRECISION = 6
const UnitConverter = new (Converter as any)()

type LatLonDMS = {
  lat: DMS
  lon: DMS
}

type LatLonDD = {
  lat: number
  lon: number
}

type CoordinateValue = LatLonDMS | LatLonDD | string | UTM

const latLonTo = {
  LatLonDD: (lat: number, lon: number): LatLonDD => ({
    lat,
    lon,
  }),
  LatLonDMS: (lat: number, lon: number): LatLonDMS => ({
    lat: decimalToDMS(lat),
    lon: decimalToDMS(lon),
  }),
  USNGBox: (north: number, south: number, east: number, west: number): string =>
    UnitConverter.LLBboxtoUSNG(north, south, east, west),
  USNG: (lat: number, lon: number, precision: number): string =>
    // Note: LLtoUSNG throws and error for 90 lat and 180 lon.
    UnitConverter.LLtoUSNG(
      lat === 90 ? 0 : lat,
      lon === 180 ? 0 : lon,
      precision
    ),
  UTM: (lat: number, lon: number): UTM => {
    const { easting, northing, zoneNumber, northPole } =
      UnitConverter.LLtoUTMUPSObject(lat, lon)
    return {
      easting,
      northing,
      zone: zoneNumber,
      hemisphere: northPole ? 'N' : 'S',
    }
  },
}

export {
  LatLonDMS,
  LatLonDD,
  CoordinateValue,
  latLonTo,
  USNG_CONVERSION_PRECISION,
  DECIMAL_DEGREES_PRECISION,
}
