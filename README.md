# Phomo

Another JavaScript framework for your FOMO.

## API

### h

The `h` function allows us to create vDOM nodes.

```javascript
const h = tag => (props = {}) => (...children) => ({
  tag,
  props,
  children,
  key: props.key
})

```

It can be used like so to make vDOM:

```javascript
const view = actions => state => (
  h('div')({ class: state.className })(
    h('h1')()('Hello from Phomo'),
    h('p')()('A tiny UI library for funsies!')
  )
)
```

### App

The `app` function generates our application and binds our actions in order to update the app.

It takes four arguments `entry, view, actions` and `state`.

An `entry` is the DOM node where we insert our application.

A `view` is a curried function that receives `actions` and `state` and returns the derived virtual DOM.

The `actions` object contains methods to update our application state with. These actions must follow a specific signature, like so:

```javascript
const actions = {
  handleClick: value => state => ({ foo: state.foo + value })
  // return some partial state object to be merged into the app state
}
```

The `state` object is a plain JavaScript object used to supply values to our application. Thus, a `view` receives these two objects like so:

```javascript
const state = {
  foo: true
}

const actions = {
  toggleFoo: () => state => ({ foo: !state.foo })
}

const view = actions => state => (
  h('div')()(
    h('p')()(`The value of foo is: ${state.foo}`),
    h('button')({ onclick: () => actions.toggleFoo() })('Toggle')
  )
)
```

Thus, `app` takes these arguments and an entry to generate our application, and re-renders the application with every action.




