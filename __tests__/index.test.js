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

  it('should create an object with the right props and children', () => {
    const node = h('div')({ id: 'foo' })(
      h('span')()('Hello World'),
      'Sibling Text Node',
      h('span')()('Another Node')
    )
    const expected = {
      tag: 'div',
      props: {
        id: 'foo'
      },
      children: [
        {
          tag: 'span',
          props: {},
          children: ['Hello World']
        },
        'Sibling Text Node',
        {
          tag: 'span',
          props: {},
          children: ['Another Node']
        }
      ]
    }

    expect(node).toEqual(expected)
  })
})
