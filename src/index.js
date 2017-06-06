import React from 'react'
import ReactDOM from 'react-dom'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import registerServiceWorker from './registerServiceWorker'
import 'semantic-ui-css/semantic.min.css'
import './index.css'

const store = configureStore()
ReactDOM.render(<Root store={store} />, document.getElementById('root'))
registerServiceWorker()

if (module.hot) {
  module.hot.accept()
}
