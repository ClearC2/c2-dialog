import { Map } from 'immutable'
import { createStore, applyMiddleware, compose } from 'redux'
import { combineReducers } from 'redux-immutable'
import {reducer as dialogReduer} from '../../src/index'

const reducer = combineReducers({
  [dialogReduer.key]: dialogReduer
})

const store = createStore(
  reducer,
  Map(),
  compose(
    window && window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

export default store
