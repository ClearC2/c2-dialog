# C2 Dialog

C2 Dialog is a wrapper around [react-rnd](https://github.com/bokuweb/react-rnd) to create dialogs via the redux state.

## Installation

Install C2 Dialog by adding the following to your package.json file:

```
"c2-dialog": "git+ssh://git@github.com:ClearC2/c2-dialog.git",
```

Now you can import and start using modals and dialogs.

### Modal
Modals get rendered at the end of the `body` tag via `react-portal`. A backdrop will be rendered that will restrict clicking on anywhere but the modal.

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
Dialogs do not have a backdrop making it useful for having multiple rendered at once. The dialogs are rendered in place and will be positioned relative to their containing markup.

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

If you need finer control over where exactly the dialogs get rendered, use `react-portal`.

```
import {Portal} from 'react-portal'
import {Dialog} from 'c2-dialog'

// in render...

<Portal node={document.getElementById('leaflet-map')}>
  <Dialog {...dialogProps}>
    {content}
  </Dialog>
</Portal>
```

The components will horizontally align itself if the `center` prop is passed and there is a `width` found in the `default` prop.
