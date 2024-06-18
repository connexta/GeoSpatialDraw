import '../../internal/tests'
import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import NumberInput from './number-input'

describe('<NumberInput />', () => {
  describe('renders', () => {
    it('default', () => {
      const wrapper = shallow(<NumberInput value={0} onChange={() => {}} />)
      expect(wrapper.exists()).to.equal(true)
    })
  })
  describe('formatting', () => {
    it('formatted number past max', () => {
      const wrapper = shallow(
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
        <NumberInput value={-100.0125} onChange={() => {}} />
      )
      expect(wrapper.find('input').prop('value')).to.equal('-100')
    })
  })
  describe('propChange', () => {
    it('lower maxValue within range', () => {
      const wrapper = shallow(
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
        <NumberInput
          value={0}
          maxValue={50}
          minValue={-50}
          decimalPlaces={3}
          onChange={(value) => {
            expect(value).to.equal(50)
            done()
          }}
        />
      )
      wrapper.find('input').prop('onChange')({
        currentTarget: {
          value: '100',
        },
      })
      wrapper.find('input').prop('onBlur')()
    })
    it('changed to number in bounds', (done) => {
      const wrapper = shallow(
        <NumberInput
          value={0}
          maxValue={50}
          minValue={-50}
          decimalPlaces={3}
          onChange={(value) => {
            expect(value).to.equal(3.025)
            done()
          }}
        />
      )
      wrapper.find('input').prop('onChange')({
        currentTarget: {
          value: '3.025',
        },
      })
      wrapper.find('input').prop('onBlur')()
    })
    it('changed to number < min', (done) => {
      const wrapper = shallow(
        <NumberInput
          value={0}
          maxValue={50}
          minValue={-50}
          decimalPlaces={3}
          onChange={(value) => {
            expect(value).to.equal(-50)
            done()
          }}
        />
      )
      wrapper.find('input').prop('onChange')({
        currentTarget: {
          value: '-100000000.9999999',
        },
      })
      wrapper.find('input').prop('onBlur')()
    })
  })
})
