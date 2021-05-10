import { expect } from 'chai'
import Renderer from './renderer'

define('-Renderer', () => {
  class MockMap {
    layer = null
    addLayer(layer) {
      this.layer = layer
    }
  }
  define('constructor', () => {
    it('Adds vector layer', () => {
      const map = new MockMap()
      const renderer = new Renderer(map)
      expect(map.layer).to.not.equal(null)
    })
  })
  define('renderList', () => {
    it('Adds list of geos to layer', () => {
      const map = new MockMap()
      const renderer = new Renderer(map)
      renderer.renderList([
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [125.6, 10.1],
          },
          properties: {
            name: 'Dinagat Islands',
            color: 'blue',
          },
        },
        {
          type: 'Feature',
          properties: {
            color: 'white',
          },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [29.53125, 18.979025953255267],
                [24.960937499999996, 6.315298538330033],
                [42.1875, 7.013667927566642],
                [50.2734375, 18.646245142670608],
                [29.53125, 18.979025953255267],
              ],
            ],
          },
        },
      ])
      expect(map.layer.getSource().getFeatures().length).to.equal(2)
    })
  })
  define('addGeo', () => {
    it('Adds geo to layer', () => {
      const map = new MockMap()
      const renderer = new Renderer(map)
      renderer.addGeo({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [125.6, 10.1],
        },
        properties: {
          name: 'Dinagat Islands',
          color: 'blue',
        },
      })
      expect(map.layer.getSource().getFeatures().length).to.equal(1)
    })
  })
  define('clearGeos', () => {
    it('Removes all geos', () => {
      const map = new MockMap()
      const renderer = new Renderer(map)
      renderer.renderList([
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [125.6, 10.1],
          },
          properties: {
            name: 'Dinagat Islands',
            color: 'blue',
          },
        },
        {
          type: 'Feature',
          properties: {
            color: 'white',
          },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [29.53125, 18.979025953255267],
                [24.960937499999996, 6.315298538330033],
                [42.1875, 7.013667927566642],
                [50.2734375, 18.646245142670608],
                [29.53125, 18.979025953255267],
              ],
            ],
          },
        },
      ])
      expect(map.layer.getSource().getFeatures().length).to.equal(2)
      renderer.clearGeos()
      expect(map.layer.getSource().getFeatures().length).to.equal(0)
    })
  })
})