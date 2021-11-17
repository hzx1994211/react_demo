import React from 'react'
import { Breadcrumb } from 'antd'
import { withRouter, matchPath, Router } from 'react-router'
// import { connect } from 'react-redux'
import routes from '@/router'
import { Link } from 'react-router-dom'

//
function matchRoutes (routes, pathname, branch = []) {
  routes.some(route => {
    const match = route.path
      ? matchPath(pathname, route)
      : branch.length
      ? branch[branch.length - 1].match
      : Router.computeRootMatch(pathname)
    if (match) {
      branch.push({ route, match })
      if (route.routes) {
        matchRoutes(route.routes, pathname, branch)
      }
    }
    return match
  })
  return branch
}

function MyBreadCrumb (props) {
  const pathname = props.location.pathname
  const branch = matchRoutes(routes, pathname)
  return (
    <div>
      <Breadcrumb style={{ margin: '16px 0' }}>
        {branch.map((route, index) => {
          return route.match.url === pathname ? (
            <Breadcrumb.Item key={index}>
              {route.route.meta.title}
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item key={index}>
              <Link
                to={
                  route.route.redirect ? route.route.redirect : route.match.path
                }
                key={index}
                className='back'
              >
                {route.route.meta.title}
              </Link>
            </Breadcrumb.Item>
          )
        })}
      </Breadcrumb>
    </div>
  )
}

export default withRouter(MyBreadCrumb)
