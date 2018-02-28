export const h = tag => (props = {}) => (...children) => ({
  tag,
  props,
  children,
  key: props.key
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

const render = entry => view => {
  entry.innerHTML = ''
  entry.appendChild(nodeToDOM(view))
}

export const app = (entry, view, actions, state) => {
  let appState = state
  const renderEntry = render(entry)
  const viewWithActions = view(bindActions(actions))

  renderEntry(viewWithActions(appState))

  function bindActions(actions) {
    return Object.keys(actions).reduce((boundActions, key) => {
      boundActions[key] = value => {
        appState = Object.assign({}, appState, actions[key](value)(appState))
        renderEntry(viewWithActions(appState))
      }

      return boundActions
    }, {})
  }
}
