import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import {
  composeWithDevTools
} from 'redux-devtools-extension/logOnlyInProduction'
import promise from '../middleware/promise'
import settings from '../middleware/settings'
import sync from '../middleware/sync'
import rootReducer from '../reducers'

const enhancer = composeWithDevTools(
  applyMiddleware(thunk, promise, settings, sync)
)

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer)

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    )
  }

  return store
}
