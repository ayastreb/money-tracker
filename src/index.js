import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/Root'
import registerServiceWorker from './registerServiceWorker'
import 'semantic-ui-css/semantic.min.css'
import './index.css'

ReactDOM.render(<Root />, document.getElementById('root'))
registerServiceWorker()

if (module.hot) {
  module.hot.accept()
}
