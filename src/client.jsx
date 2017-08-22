import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import {store} from './redux.js'

import App from './containers/AppContainer.jsx'

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
)
