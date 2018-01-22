import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Dialog from './Dialog'

export default class Modal extends Component {
  static propTypes = {
    backdropStyle: PropTypes.object
  }
  render () {
    const bStyle = {
      position: 'fixed',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      overflowX: 'hidden',
      overflowY: 'auto',
      outline: 0,
      zIndex: 2000000,
      ...(this.props.backdropStyle || {})
    }
    return (
      <Dialog {...this.props} backdropStyle={bStyle} />
    )
  }
}
