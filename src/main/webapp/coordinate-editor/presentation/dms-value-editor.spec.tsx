import '../../internal/tests'
import * as React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { DMSValueEditor } from './dms-value-editor'

describe('<DMSValueEditor />', () => {
  const getWrapper = (
    degree: any,
    minute: any,
    second: any,
    setValue = () => {}
  ) =>
    shallow(
      // @ts-ignore
      <DMSValueEditor
        maxDegrees={90}
        negativeHeadingName="-"
        negativeHeadingTooltip=""
        positiveHeadingName="+"
        positiveHeadingTooltip=""
        value={{
          degree,
          minute,
          second,
        }}
        setValue={setValue}
      />
    )
  describe('renders', () => {
    it('default', () => {
      const wrapper = getWrapper(30, 15, 7.5)
      expect(wrapper.exists()).to.equal(true)
      expect(wrapper.find('SmallInput').length).to.equal(2)
      expect(wrapper.find('WideInput').length).to.equal(1)
      expect(wrapper.find('HeadingButton').length).to.equal(2)
    })
    it('positive value', () => {
      const wrapper = getWrapper(30, 15, 7.5)
      expect(
        wrapper.find('HeadingButton[isSelected=true]').childAt(0).text()
      ).to.equal('+')
    })
    it('negative value', () => {
      const wrapper = getWrapper(-30, 15, 7.5)
      expect(
        wrapper.find('HeadingButton[isSelected=true]').childAt(0).text()
      ).to.equal('-')
    })
  })
  describe('setValue', () => {
    const getValueWrapper = (done: any, expectedDMS: any) =>
      // @ts-ignore
      getWrapper(5, 5, 5, (dms: any) => {
        expect(dms).to.deep.equal(expectedDMS)
        done()
      })
    it('degree', (done) => {
      const wrapper = getValueWrapper(done, {
        degree: 11,
        minute: 5,
        second: 5,
      })
      // @ts-ignore
      wrapper.find('SmallInput').at(0).prop('onChange')(11)
    })
    it('minute', (done) => {
      const wrapper = getValueWrapper(done, {
        degree: 5,
        minute: 45,
        second: 5,
      })
      // @ts-ignore
      wrapper.find('SmallInput').at(1).prop('onChange')(45)
    })
    it('second', (done) => {
      const wrapper = getValueWrapper(done, {
        degree: 5,
        minute: 5,
        second: 78,
      })
      // @ts-ignore
      wrapper.find('WideInput').prop('onChange')(78)
    })
    it('positive', (done) => {
      const wrapper = getValueWrapper(done, {
        degree: 5,
        minute: 5,
        second: 5,
      })
      // @ts-ignore
      wrapper.find('HeadingButton').at(1).prop('onClick')()
    })
    it('negative', (done) => {
      const wrapper = getValueWrapper(done, {
        degree: -5,
        minute: -5,
        second: -5,
      })
      // @ts-ignore
      wrapper.find('HeadingButton').at(0).prop('onClick')()
    })
  })
})
