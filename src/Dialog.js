import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Rnd from 'react-rnd'

let zIndex = 2000

export default class Dialog extends Component {
  static propTypes = {
    default: PropTypes.object,
    center: PropTypes.bool
  }

  static defaultProps = {
    default: {},
    center: false
  }

  componentDidMount () {
    this.updateZIndex()
  }

  updateZIndex = () => {
    this.rnd.updateZIndex(++zIndex)
  }

  render () {
    const {center} = this.props
    const width = this.props.default.width
    const x = center && width ? (window.innerWidth / 2) - (width / 2) : this.props.default.x

    const defaultProps = {...this.props.default, x}
    return (
      <Rnd
        {...this.props}
        default={defaultProps}
        ref={rnd => { this.rnd = rnd }}
        onDrag={function () {
          this.updateZIndex()
          if (this.props.onDrag) this.props.onDrag(...arguments)
        }.bind(this)}
        onDragStop={function () {
          this.updateZIndex()
          if (this.props.onDragStop) this.props.onDragStop(...arguments)
        }.bind(this)}
      >
        {this.props.children}
      </Rnd>
    )
  }
}
