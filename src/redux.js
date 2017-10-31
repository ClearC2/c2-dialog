import {Map, fromJS} from 'immutable'

const OPEN_DIALOG = 'c2-dialog/open-dialog'
const CLOSE_DIALOG = 'c2-dialog/close-dialog'

export const openDialog = (id, component, props = [], channel) => {
  return {type: OPEN_DIALOG, id, component, props, channel}
}

export const closeDialog = id => {
  return {type: CLOSE_DIALOG, id}
}

export function reducer (state = Map(), action) {
  switch (action.type) {
    case OPEN_DIALOG:
      return state.set(action.id, fromJS({
        id: action.id,
        channel: action.channel,
        component: action.component,
        props: action.props || {}
      }))
    case CLOSE_DIALOG:
      return state.delete(action.id)
    default:
      return state
  }
}

reducer.key = 'c2-dialog'

export const dialogs = (state, {channel}) => {
  const defaultChannel = 'c2-dialog/app'
  return state
    .get(reducer.key, Map())
    .toList()
    .filter(d => (d.get('channel') || defaultChannel) === (channel || defaultChannel))
}
