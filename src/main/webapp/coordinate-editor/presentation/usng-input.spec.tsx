import '../../internal/tests'
import * as React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import USNGInput from './usng-input'

describe('<USNGInput />', () => {
  describe('renders', () => {
    it('default', () => {
      const wrapper = shallow(
        // @ts-ignore
        <USNGInput value={0} onChange={() => {}} />
      )
      expect(wrapper.exists()).to.equal(true)
    })
  })
  describe('formatting', () => {
    it('default', () => {
      const wrapper = shallow(
        // @ts-ignore
        <USNGInput value="18SUJ22850705" />
      )
      expect(wrapper.find('TextInput').prop('value')).to.equal('18SUJ22850705')
    })
  })
  describe('onChange', () => {
    it('default', (done) => {
      const wrapper = shallow(
        // @ts-ignore
        <USNGInput
          value=""
          onChange={(value: any) => {
            expect(value).to.equal('18SUJ22850705')
            done()
          }}
        />
      )
      // @ts-ignore
      wrapper.find('TextInput').prop('onChange')({
        currentTarget: {
          // @ts-ignore
          value: '18SUJ22850705',
        },
      })
      // @ts-ignore
      wrapper.find('TextInput').prop('onBlur')()
    })
  })
})
