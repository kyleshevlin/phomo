export const h = tag => (props = {}) => (...children) => ({
  tag,
  props,
  children
})

const nodeToDOM = ({ tag, props, children }) => {
  const el = document.createElement(tag)

  for (let key in props) {
    const value = props[key]

    if (typeof value === 'function') {
      el[key] = value
    } else {
      el.setAttribute(key, value)
    }
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

export const render = entry => view => {
  entry.innerHTML = ''
  entry.appendChild(nodeToDOM(view))
}
