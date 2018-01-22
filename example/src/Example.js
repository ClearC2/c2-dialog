import React, {Component} from 'react'
import {Modal, Dialog, setPortalNode} from '../../src/index'

setPortalNode(document.getElementById('dialogs'))

export default class Example extends Component {
  state = {
    modal: false,
    dialogs: {}
  }
  render () {
    return (
      <div className='text-center' style={{marginTop: 200}}>
        <button className='btn btn-primary' onClick={() => this.setState({modal: true})}>Open Modal</button>
        {this.state.modal && (
          <Modal
            center
            nodee={document.getElementById('dialogs')}
            enableResizing={false}
            disableDragging
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
              <span aria-hidden='true'>&times;</span>
            </button>
            <br />
            <h2>{`I'm a modal`}</h2>
          </Modal>
        )}
        <hr />
        <button
          className='btn btn-primary'
          onClick={() => {
            this.setState({dialogs: {...this.state.dialogs, [(new Date()).getTime()]: true}})
          }}>
          Open Dialog</button>
        {Object.keys(this.state.dialogs).map(id => (
          <Dialog
            key={id}
            nodee={document.getElementById('dialogs')}
            center
            style={{
              background: '#fff',
              boxShadow: '0px 0px 15px #444',
              borderRadius: '5px',
              padding: 10
            }}
            default={{
              y: 100,
              width: 400,
              height: 200
            }}>
            <button className='close' onClick={() => {
              const dialogs = Object.assign({}, this.state.dialogs)
              delete dialogs[id]
              this.setState({dialogs})
            }}>
              <span aria-hidden='true'>&times;</span>
            </button>
            <br />
            <h2>{`I'm a dialog: ${id}`}</h2>
          </Dialog>
        ))}
      </div>
    )
  }
}
