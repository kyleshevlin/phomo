import { h } from '../src'

describe('h', () => {
  it('should return defaults for props and children', () => {
    const node = h('div')()()
    const expected = {
      tag: 'div',
      props: {},
      children: []
    }

    expect(node).toEqual(expected)
  })
})
