import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './assets/styles/reset.css'
import { Provider } from 'react-redux'
import store from './store'
import { persistor } from './store'
import { PersistGate } from 'redux-persist/lib/integration/react'
import zhCN from 'antd/lib/locale/zh_CN'
import { ConfigProvider } from 'antd'

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </PersistGate>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
)
