import OfficesList from '@/views/Interspace/OfficesList'
import HousesList from '@/views/Interspace/HousesList'
import OfficesDetail from '@/views/Interspace/OfficesDetail'
import Layout from '@/components/Layout'

const interspaceRoutes = {
  path: '/interspace',
  component: Layout,
  name: 'interspace',
  requireAuth: true,
  redirect: '/interspace/officesList',
  meta: { title: '资源管理', permission: '/interspace' },
  routes: [
    {
      path: '/interspace/officesList',
      exact: true,
      component: OfficesList,
      name: 'officesList',
      requireAuth: true,
      hiddenInMenu: false,
      meta: { title: '写字楼库', permission: 'officesList' }
    },
    {
      path: '/interspace/officesDetail',
      exact: true,
      component: OfficesDetail,
      name: 'officesDetail',
      requireAuth: true,
      hiddenInMenu: true,
      meta: { title: '写字楼详情', permission: 'officesDetail' }
    },
    {
      path: '/interspace/housesList',
      exact: true,
      component: HousesList,
      name: 'housesList',
      requireAuth: true,
      hiddenInMenu: false,
      meta: { title: '房源库', permission: 'housesList' }
    }
  ]
}

export default interspaceRoutes
