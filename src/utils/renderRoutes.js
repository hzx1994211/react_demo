import { message } from 'antd'
import React from 'react'
import { Route, Redirect, Switch } from 'react-router'
import { getToken } from '@/utils/token'

const renderRoutes = (
  routes,
  // authed,
  authPath = '/login',
  extraProps = {},
  switchProps = {}
) =>
  routes ? (
    <Switch {...switchProps}>
      {routes.map((route, index) => (
        <Route
          key={route.key || index}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={props => {
            console.log(props, '-props-')
            const authed = getToken() ?? false
            if (!route.requireAuth || authed || route.path === authPath) {
              return <route.component {...props} {...extraProps} route={route} />
            } else {
              message.warn('请先登录！')
              return <Redirect to={{ pathname: authPath, state: { form: props.location } }} />
            }
          }}
        />
      ))}
    </Switch>
  ) : null

export default renderRoutes
