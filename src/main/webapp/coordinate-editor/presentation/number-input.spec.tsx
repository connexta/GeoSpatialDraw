import '../../internal/tests'
import * as React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import NumberInput from './number-input'

describe('<NumberInput />', () => {
  describe('renders', () => {
    it('default', () => {
      const wrapper = shallow(
        // @ts-ignore
        <NumberInput value={0} onChange={() => {}} />
      )
      expect(wrapper.exists()).to.equal(true)
    })
  })
  describe('formatting', () => {
    it('formatted number past max', () => {
      const wrapper = shallow(
        // @ts-ignore
        <NumberInput
          value={100}
          maxValue={50}
          minValue={-50}
          decimalPlaces={3}
          onChange={() => {}}
        />
      )
      expect(wrapper.find('input').prop('value')).to.equal('50.000')
    })
    it('formatted number within bounds', () => {
      const wrapper = shallow(
        // @ts-ignore
        <NumberInput
          value={13.1231122}
          maxValue={50}
          minValue={-50}
          decimalPlaces={3}
          onChange={() => {}}
        />
      )
      expect(wrapper.find('input').prop('value')).to.equal('13.123')
    })
    it('formatted number below min', () => {
      const wrapper = shallow(
        // @ts-ignore
        <NumberInput
          value={-66.6666666666}
          maxValue={50}
          minValue={-50}
          decimalPlaces={3}
          onChange={() => {}}
        />
      )
      expect(wrapper.find('input').prop('value')).to.equal('-50.000')
    })
    it('no constraints', () => {
      const wrapper = shallow(
        // @ts-ignore
        <NumberInput value={-100.0125} onChange={() => {}} />
      )
      expect(wrapper.find('input').prop('value')).to.equal('-100')
    })
  })
  describe('propChange', () => {
    it('lower maxValue within range', () => {
      const wrapper = shallow(
        // @ts-ignore
        <NumberInput
          value={0}
          maxValue={50}
          minValue={-50}
          decimalPlaces={3}
          onChange={() => {}}
        />
      )
      wrapper.setProps({ maxValue: 0 })
      expect(wrapper.find('input').prop('value')).to.equal('0.000')
    })
    it('lower maxValue below range', () => {
      const wrapper = shallow(
        // @ts-ignore
        <NumberInput
          value={0}
          maxValue={50}
          minValue={-50}
          decimalPlaces={3}
          onChange={() => {}}
        />
      )
      wrapper.setProps({ maxValue: -10 })
      expect(wrapper.find('input').prop('value')).to.equal('-10.000')
    })
    it('raise minValue within range', () => {
      const wrapper = shallow(
        // @ts-ignore
        <NumberInput
          value={0}
          maxValue={50}
          minValue={-50}
          decimalPlaces={3}
          onChange={() => {}}
        />
      )
      wrapper.setProps({ minValue: 0 })
      expect(wrapper.find('input').prop('value')).to.equal('0.000')
    })
    it('raise minValue above range', () => {
      const wrapper = shallow(
        // @ts-ignore
        <NumberInput
          value={0}
          maxValue={50}
          minValue={-50}
          decimalPlaces={3}
          onChange={() => {}}
        />
      )
      wrapper.setProps({ minValue: 10 })
      expect(wrapper.find('input').prop('value')).to.equal('10.000')
    })
  })
  describe('onChange', () => {
    it('changed to number > max', (done) => {
      const wrapper = shallow(
        // @ts-ignore
        <NumberInput
          value={0}
          maxValue={50}
          minValue={-50}
          decimalPlaces={3}
          onChange={(value: any) => {
            expect(value).to.equal(50)
            done()
          }}
        />
      )
      // @ts-ignore
      wrapper.find('input').prop('onChange')({
        currentTarget: {
          // @ts-ignore
          value: '100',
        },
      })
      // @ts-ignore
      wrapper.find('input').prop('onBlur')()
    })
    it('changed to number in bounds', (done) => {
      const wrapper = shallow(
        // @ts-ignore
        <NumberInput
          value={0}
          maxValue={50}
          minValue={-50}
          decimalPlaces={3}
          onChange={(value: any) => {
            expect(value).to.equal(3.025)
            done()
          }}
        />
      )
      // @ts-ignore
      wrapper.find('input').prop('onChange')({
        currentTarget: {
          // @ts-ignore
          value: '3.025',
        },
      })
      // @ts-ignore
      wrapper.find('input').prop('onBlur')()
    })
    it('changed to number < min', (done) => {
      const wrapper = shallow(
        // @ts-ignore
        <NumberInput
          value={0}
          maxValue={50}
          minValue={-50}
          decimalPlaces={3}
          onChange={(value: any) => {
            expect(value).to.equal(-50)
            done()
          }}
        />
      )
      // @ts-ignore
      wrapper.find('input').prop('onChange')({
        currentTarget: {
          // @ts-ignore
          value: '-100000000.9999999',
        },
      })
      // @ts-ignore
      wrapper.find('input').prop('onBlur')()
    })
  })
})
