import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Rnd} from 'react-rnd'
import {Portal} from 'react-portal'
import $ from 'jquery'

let zIndex = 2000
let portalNode = null

export function setPortalNode (node) {
  portalNode = node
}

export default class Dialog extends Component {
  static propTypes = {
    default: PropTypes.object,
    center: PropTypes.bool,
    inline: PropTypes.bool,
    backdropStyle: PropTypes.object,
    node: PropTypes.object,
    getRnd: PropTypes.func,
    zIndex: PropTypes.number
  }

  static defaultProps = {
    default: {},
    center: false,
    backdropStyle: null,
    inline: false,
    node: null,
    style: {},
    getRnd: () => {}
  }

  constructor (props) {
    super(props)
    const defaultProps = props.default || {}
    this.state = {
      ...defaultProps,
      dragged: false,
      zIndex
    }
  }

  componentDidMount () {
    this.updateZIndex()
    $(window).resize(this.onResize)
  }

  componentWillUnmount () {
    $(window).off('resize', this.onResize)
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
    ++zIndex
    this.setState({
      zIndex
    })
  }

  renderRnd = (defaultProps) => {
    const {
      inline,
      center,
      backdropStyle,
      style,
      getRnd,
      ...props
    } = this.props
    return (
      <Rnd
        {...props}
        style={{...style, zIndex: this.props.zIndex || this.state.zIndex}}
        default={defaultProps}
        ref={rnd => {
          this.rnd = rnd
          if (rnd) getRnd(rnd)
        }}
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

    return (
      <Portal node={this.props.node || portalNode}>
        {this.props.backdropStyle ? (
          <div style={this.props.backdropStyle}>
            {rnd}
          </div>
        ) : rnd}
      </Portal>
    )
  }
}
