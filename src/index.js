import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import welcomeReducer from './Welcome/reducers'
import Welcome from './Welcome/'
import registerServiceWorker from './registerServiceWorker'
import 'semantic-ui-css/semantic.min.css'
import './index.css'

let store = createStore(welcomeReducer)

ReactDOM.render(
  <Provider store={store}><Welcome /></Provider>,
  document.getElementById('root')
)
registerServiceWorker()
