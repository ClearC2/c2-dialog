import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Dialogs, dialogs, openDialog, Modal, Dialog} from '../../src/index'
import {Portal} from 'react-portal'

const Foo = ({close, value}) => (
  <div>
    <div className='text-right pointer'>
      <button onClick={close} className='close'>×</button>
    </div>
    <h2>{value || 'Dialog'}</h2>
    <br/><br/><br/>
  </div>
)
const Bar = () => <h2>Bar</h2>

const componentMap = {
  Foo,
  Bar
}

class Example extends Component {
  state = {
    value: '',
    channel: '',
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
        <hr/>
        <button
          className='btn btn-primary'
          onClick={() => {
            this.setState({dialogs: {...this.state.dialogs, [(new Date()).getTime()]: true}})
          }}>
          Open Dialog</button>
          {Object.keys(this.state.dialogs).map(id => (
            <Dialog
              key={id}
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
                <span aria-hidden="true">&times;</span>
              </button>
              <br />
              <h2>{`I'm a dialog: ${id}`}</h2>
            </Dialog>
          ))}
      </div>
    )
  }
}

function props (state, props) {
  return {
    dialogs: dialogs(state, props)
  }
}

export default connect(props, {openDialog})(Example)
