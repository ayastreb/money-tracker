import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import {
  composeWithDevTools
} from 'redux-devtools-extension/logOnlyInProduction'
import persistSettings from '../middleware/persistSettings'
import rootReducer from '../reducers'

const enhancer = composeWithDevTools(applyMiddleware(thunk, persistSettings))

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer)

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    )
  }

  return store
}
