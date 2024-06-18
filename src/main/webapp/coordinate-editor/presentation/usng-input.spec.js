import '../../internal/tests'
import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import USNGInput from './usng-input'

describe('<USNGInput />', () => {
  describe('renders', () => {
    it('default', () => {
      const wrapper = shallow(<USNGInput value={0} onChange={() => {}} />)
      expect(wrapper.exists()).to.equal(true)
    })
  })
  describe('formatting', () => {
    it('default', () => {
      const wrapper = shallow(<USNGInput value="18SUJ22850705" />)
      expect(wrapper.find('TextInput').prop('value')).to.equal('18SUJ22850705')
    })
  })
  describe('onChange', () => {
    it('default', (done) => {
      const wrapper = shallow(
        <USNGInput
          value=""
          onChange={(value) => {
            expect(value).to.equal('18SUJ22850705')
            done()
          }}
        />
      )
      wrapper.find('TextInput').prop('onChange')({
        currentTarget: {
          value: '18SUJ22850705',
        },
      })
      wrapper.find('TextInput').prop('onBlur')()
    })
  })
})
