import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Portal} from 'react-portal'
import Dialog from './Dialog'

export default class Modal extends Component {
  static propTypes = {
    backdropStyle: PropTypes.object
  }

  static defaultProps = {
    backdropStyle: {
      position: 'fixed',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      overflowX: 'hidden',
      overflowY: 'auto',
      outline: 0,
      zIndex: 2000000
    }
  }
  render () {
    const {backdropStyle, ...props} = this.props
    return (
      <Portal>
        <div style={backdropStyle}>
          <Dialog {...props} />
        </div>
      </Portal>
    )
  }
}
