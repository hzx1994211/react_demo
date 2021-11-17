import CustomerCaseList from '@/views/Merchants/CustomerCaseList'
import Layout from '@/components/Layout'

const merchants = {
  path: '/merchants',
  component: Layout,
  name: 'merchants',
  requireAuth: true,
  redirect: '/merchants/customer',
  meta: { title: '招商管理', permission: 'merchants' },
  routes: [
    {
      path: '/merchants/customer',
      exact: true,
      component: CustomerCaseList,
      name: 'customerList',
      requireAuth: true,
      meta: { title: '客户线索池', permission: 'customerCaseList' }
    }
    // {
    //   path: '/merchants/housesList',
    //   exact: true,
    //   component: HousesList,
    //   name: 'housesList',
    //   requireAuth: true,
    //   meta: { title: '房源库', permission: 'housesList' }
    // }
  ]
}

export default merchants
