import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Dialogs, dialogs, openDialog} from '../../src/index'

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
    channel: ''
  }
  render () {
    return (
      <div>
        <Dialogs
          components={componentMap}
          style={{
            border: '0px solid #555',
            background: '#fff',
            boxShadow: '0px 0px 15px #444',
            borderRadius: '5px'
          }}
          default={{
            x: (window.innerWidth / 2) - (200 / 2),
            y: 100,
            width: 200,
            height: 200
          }}
        />
        <div className='row' style={{marginTop: 100}}>
          <div className='col-xs-offset-5 col-xs-3'>
            <form
              className='form-inline'
              onSubmit={e => {
                e.preventDefault()
                const id = (new Date()).getTime()
                this.props.openDialog(id, 'Foo', {value: this.state.value}, this.state.channel)
                this.setState({value: ''})
              }}>
              <div className='form-group'>
                <label> </label>
                <input
                  className='form-control'
                  value={this.state.value}
                  onChange={e => this.setState({value: e.target.value})}
                />
              </div>
              <div className='form-group'>
                <label> </label>
                <select
                  className='form-control'
                  value={this.state.channel}
                  onChange={e => this.setState({channel: e.target.value})}
                >
                  <option value=''>white</option>
                  <option>red</option>
                </select>
              </div>
              &nbsp; <button type='submit' className='btn btn-default'>+ Dialog</button>
            </form>
          </div>
        </div>
        <Dialogs
          channel='red'
          components={componentMap}
          style={{
            border: '0px solid #555',
            background: 'red',
            boxShadow: '0px 0px 15px red',
            borderRadius: '5px'
          }}
          default={{
            x: (window.innerWidth / 2) - (200 / 2),
            y: 100,
            width: 200,
            height: 200
          }}
        />
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
