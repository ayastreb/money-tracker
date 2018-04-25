import { createBrowserHistory } from 'history'
import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import Root from './containers/Root'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import configureStore from './store/configureStore'

const store = configureStore()
const history = createBrowserHistory()
ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)

registerServiceWorker()

if (module.hot) {
  module.hot.accept()
}
