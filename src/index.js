import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import 'semantic-ui-css/semantic.min.css'
import './index.css'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
