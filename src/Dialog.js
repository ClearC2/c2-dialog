import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Rnd from 'react-rnd'
import {Portal} from 'react-portal'
import $ from 'jquery'

let zIndex = 2000
const backdropZIndex = 1999

export default class Dialog extends Component {
  static propTypes = {
    default: PropTypes.object,
    center: PropTypes.bool,
    inline: PropTypes.bool,
    backdropStyle: PropTypes.object,
    node: PropTypes.object
  }

  static defaultProps = {
    default: {},
    center: false,
    backdropStyle: {},
    inline: false,
    node: null
  }

  constructor (props) {
    super(props)
    const defaultProps = props.default || {}
    this.state = {
      ...defaultProps,
      dragged: false
    }
  }

  componentDidMount = () => {
    this.updateZIndex()
    $(window).resize(this.onResize)
  }

  componentWillUnmount = () => {
    $(window).off("resize", this.onResize);
  }

  onResize = () => this.center()

  center = width => {
    if (this.props.center && !this.state.dragged) {
      width = width || this.state.width
      const x = (window.innerWidth / 2) - (width / 2)
      this.rnd.updatePosition({x})
    }
  }

  updateZIndex = () => {
    this.rnd.updateZIndex(++zIndex)
  }

  renderRnd = (defaultProps) => {
    return (
      <Rnd
        {...this.props}
        default={defaultProps}
        ref={rnd => { this.rnd = rnd }}
        onDrag={function () {
          this.updateZIndex()
          this.setState({dragged: true})
          if (this.props.onDrag) this.props.onDrag(...arguments)
        }.bind(this)}
        onDragStop={function () {
          this.updateZIndex()
          this.setState({dragged: true})
          if (this.props.onDragStop) this.props.onDragStop(...arguments)
        }.bind(this)}
        onResizeStop={function (a, b, c, delta) {
          this.updateZIndex()
          const width = this.state.width + delta.width
          this.setState({width})
          this.center(width)
          if (this.props.onResizeStop) this.props.onResizeStop(...arguments)
        }.bind(this)}
      />
    )
  }

  render () {
    const {center} = this.props
    const width = this.props.default.width
    const x = center && width ? (window.innerWidth / 2) - (width / 2) : this.props.default.x
    const defaultProps = {...this.props.default, x}
    const rnd = this.renderRnd(defaultProps)
    if (this.props.inline) return rnd
    const backdropStyle = {position: 'fixed', top: 0, zIndex: backdropZIndex, ...this.props.backdropStyle}
    return (
      <Portal node={this.props.node}>
        <div style={backdropStyle}>
          {rnd}
        </div>
      </Portal>
    )
  }
}
