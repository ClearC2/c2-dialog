import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {closeDialog, dialogs} from './redux'
import Dialog from './Dialog'

class Dialogs extends React.Component {
  static propTypes = {
    dialogs: PropTypes.object.isRequired,
    closeDialog: PropTypes.func.isRequired,
    components: PropTypes.object.isRequired
  }
  render () {
    const {dialogs, components, ...dialogProps} = this.props
    return (
      <div style={{height: 0}}>
        {dialogs.map((dialog, i) => {
          const Component = components[dialog.get('component')]
          const componentProps = (dialog.get('props') || Map()).toJS()
          if (!Component) {
            console.error(`Invalid dialog component: ${dialog.get('component')}`)
            return <div key={`invalid-${i}`} />
          }
          return (
            <Dialog
              key={dialog.get('id')}
              {...dialogProps}
            >
              {Component ? (
                <Component
                  {...componentProps}
                  close={() => this.props.closeDialog(dialog.get('id'))}
                />
              ) : null}
            </Dialog>
          )
        })}
      </div>
    )
  }
}

function props (state, props) {
  return {dialogs: dialogs(state, props)}
}

export default connect(props, {closeDialog})(Dialogs)
