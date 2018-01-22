# C2 Dialog

C2 Dialog is a wrapper around [react-rnd](https://github.com/bokuweb/react-rnd) to create dialogs via the redux state.

## Installation

Install C2 Dialog by adding the following to your package.json file:

```
"c2-dialog": "git+ssh://git@github.com:ClearC2/c2-dialog.git",
```

Now you can import and start using modals and dialogs.

### Modal
A backdrop will be rendered that will restrict clicking on anywhere but the modal.

```
import {Modal} from 'c2-dialog'

// in render...

<button onClick={() => this.setState({modal: true})}>Open Modal</button>
{this.state.modal && (
  <Modal
    center
    enableResizing={false}
    disableDragging={true}
    style={{
      background: '#fff',
      boxShadow: '0px 0px 15px #444',
      borderRadius: '5px',
      padding: 10
    }}
    default={{
      y: 100,
      width: 200,
      height: 200
    }}>
    <button className='close' onClick={() => this.setState({modal: false})}>
      <span aria-hidden="true">&times;</span>
    </button>
    <br />
    <h2>{`I'm a modal`}</h2>
  </Modal>
)}

```

### Dialog
Dialogs do not have a backdrop making it useful for having multiple rendered at once.

```
import {Dialog} from 'c2-dialog'

// in render...

<button onClick={() => this.setState({dialog: true})}>Open Dialog</button>
{this.state.dialog && (
  <Dialog
    center
    style={{
      background: '#fff',
      boxShadow: '0px 0px 15px #444',
      borderRadius: '5px',
      padding: 10
    }}
    default={{
      y: 100,
      width: 200,
      height: 200
    }}>
    <button className='close' onClick={() => this.setState({dialog: false})}>
      <span aria-hidden="true">&times;</span>
    </button>
    <br />
    <h2>{`I'm a dialog`}</h2>
  </Dialog>
)}
```

The components will horizontally align itself if the `center` prop is passed and there is a `width` found in the `default` prop.

### Positioning
It is recommended to create a placeholder div for `react-portal` to render the dialogs **above** your main application's root element. For example:

```
<html>
  <head>
    <title>C2 Dialog</title>
  </head>
  <body>
    <div id="dialogs" style="height: 0;"></div>
    <div id="app"/>
   <script src="bundle.js" type="text/javascript"></script>
  </body>
</html>
```

And then in the bootstrapping of your application to set that element as the default portal node.

```
// index.js
import {setPortalNode} from 'c2-dialog'

setPortalNode(document.getElementById('dialogs'))

// ...
```

`react-portal` appends content to the `body` by default. This can often be a problem because of your app's theme. Rendering dialogs into an element above your application is a safer alternative.

## Props
#### `center?: bool`
The dialog will be centered initially and be responsive based on window resizes. Default: `false`.

#### `inline?: bool`
The dialog uses `react-portal` to render the markup at the end of the `body`. Set this prop to true to disable `react-portal` and render in place. Default: `false`.

#### `node?: element`
The is the node `react-portal` will use to render the markup in. Default: Element set by `setPortalNode` otherwise `null`. `null` will append to the `body`.

#### `backdropStyle?: object`
Use this to tweak the backdrop. The only difference between a `<Modal>`and a `<Dialog>` is the `backdropStyle`.
