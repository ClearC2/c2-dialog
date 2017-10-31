import React, {Component} from 'react'
import Rnd from 'react-rnd'

let zIndex = 2000

export default class Dialog extends Component {
  componentDidMount () {
    this.updateZIndex()
  }
  updateZIndex = () => {
    this.rnd.updateZIndex(++zIndex)
  }
  render () {
    return (
      <Rnd
        {...this.props}
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
