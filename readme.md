# C2 Dialog

C2 Dialog is a wrapper around [react-rnd](https://github.com/bokuweb/react-rnd) to create dialogs via the redux state.

## Installation

Install C2 Dialog by adding the following to your package.json file:

```
"c2-dialog": "git+ssh://git@github.com:ClearC2/c2-dialog.git",
```

Next, add the reducer to your app reducer:

```js
import {combineReducers} from 'redux-immutable'
import {reducer as dialogReduer} from 'c2-dialog'

const reducer = combineReducers({
  // other reducers
  [dialogReduer.key]: dialogReduer
})
```

## Usage

Use the `<Dialogs />` tag to indicate where the dialog markup should be rendered and pass in a component map. The `<Dialogs />` component is connected to the state and renders dialogs stored in the state.

```jsx
const Foo = ({close, value}) => (
  <div>
    <div className='text-right pointer'>
      <button onClick={close} className='close'>×</button>
    </div>
    <h2>{value}</h2>
  </div>
)

const Bar = ({close}) => (
  <div>
    <div className='text-right pointer'>
      <button onClick={close} className='close'>×</button>
    </div>
    <h2>Bar Component</h2>
  </div>
)

// in render function

<div className='main-content'>
  <Dialogs components={{Foo, Bar}} />
  <Header />
  <Route path='foo' component={Foo} />
  <Footer />
</div>
```
Components used in dialogs will automatically be passed a `close()` function to close the dialog. You can also import `closeDialog` to close a dialog by id:

```jsx
import {closeDialog} from 'c2-dialog'

// ...

<button
  className='btn'
  onClose={() => this.props.closeDialog('TestDialog')}
>
  Close Test Dialog
</button>
```

### `openDialog()`

To open a dialog, dispatch the `openDialog()` action.

```jsx
import {openDialog} from 'c2-dialog'

// ...

<button
  className='btn'
  onClick={() => {
    const dialogId = (new Date()).getTime()
    this.props.openDialog(dialogId, 'Foo', {value: 'testing!'})
  }}
>
  Open Foo Dialog
</button>

<button
  className='btn'
  onClick={() => {
    const dialogId = (new Date()).getTime()
    this.props.openDialog(dialogId, 'Bar')
  }}
>
  Open Bar Dialog
</button>
```

The `openDialog()` action takes 4 arguments:

- The dialog id (required)
- The component name to render within the dialog (required)
- The props to pass to the component rendered within the dialog (optional)
- A channel name (explained below) (optional)

### `<Dialogs />`

The `<Dialogs />` component passes all props to the underlying `<Rnd />` component. You can read the [react-rnd documentation](https://github.com/bokuweb/react-rnd) to see what all is available.

There are 2 props that are unique to the `<Dialogs />` component and have nothing to do with `<Rnd />`:
- `components` - The object containing the name[componentClass] mapping
- `channel` - This is a string used to identify select dialogs to render through a specific `<Dialogs />` component.

See the following example:

```jsx
const Map = ({openDialog}) => (
    <div>
      <LeafletMap />
      <button
        className='btn'
        onClick={() => {
          openDialog('MapDialog', 'LocationDialog', {locationId: 45}, 'map')
        }}>
        Open Location
      </button>
      <Portal node={document.getElementById('leaflet-map')}>
        <Dialogs
          components={{LocationDialog}}
          channel='map'
          style={{
            border: '1px solid #555',
            background: '#fff',
            boxShadow: '0px 0px 15px #444',
            borderRadius: '5px'
          }}
          default={{
            x: (window.innerWidth / 2) - (600 / 2),
            y: 0,
            width: 600,
            height: 300
          }}
        />
      </Portal>
    </div>
)

// elsewhere in render()
<div className='main-content'>
  <Dialogs components={{Foo, Bar}} />
  <Header />
  <Route path='map' component={Map} />
  <Footer />
</div>
```

There are 2 `<Dialogs />` components being used in the above example. All `openDialog()` calls without a channel will be rendered in the instance above the header. The `<Map />` uses `react-portal` to render the "map" dialogs inside a specific div created by leaflet. These dialogs will all be styled with a gray border, white background, gray box shadow, etc. They will be 600px x 300px and centered initially.
