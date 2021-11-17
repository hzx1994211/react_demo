import Login from '@/views/Login'
import interspaceRoutes from './modules/interspace'
import merchantRoutes from './modules/merchants'
import NotFound from '@/views/404'
const routes = [
  // 写字楼路由模块
  interspaceRoutes,
  // 招商模块路由
  merchantRoutes,

  {
    path: '/login',
    component: Login,
    name: 'login',
    requireAuth: false,
    meta: { permission: false }
  },
  {
    path: '/',
    component: Login,
    name: '/',
    requireAuth: false,
    meta: { permission: false }
  },
  {
    path: '/404',
    component: NotFound,
    name: '404',
    requireAuth: false,
    meta: { permission: false }
  }
]

export default routes
