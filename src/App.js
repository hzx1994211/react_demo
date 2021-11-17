import React, { Component } from 'react'
import { HashRouter, Switch } from 'react-router-dom'
import './App.css'
import routes from './router'
import renderRoutes from '@/utils/renderRoutes'

class App extends Component {
  render () {
    return (
      <HashRouter>
        <Switch>{renderRoutes(routes)}</Switch>
      </HashRouter>
    )
  }
}

export default App
