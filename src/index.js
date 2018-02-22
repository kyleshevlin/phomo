export const h = tag => (props = {}) => (...children) => ({
  tag,
  props,
  children
})

const nodeToDOM = ({ tag, props, children }) => {
  const el = document.createElement(tag)

  for (let key in props) {
    el.setAttribute(key, props[key])
  }

  children.forEach(child => {
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child))
    } else {
      el.appendChild(nodeToDOM(child))
    }
  })

  return el
}

export const render = tree => entry => {
  entry.appendChild(nodeToDOM(tree))
}
