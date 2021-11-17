import React from 'react'

import { Menu } from 'antd'
import { MailOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import routes from '@/router'

const { SubMenu } = Menu

const MyMenu = props => {
  const authInfoList = props.authInfo.map(auth => auth.url) ?? []
  const permissRouteList = routes.filter(route => route.requireAuth)
  const rootSubmenuKeys = permissRouteList.map(route => route.name)
  const [openKeys, setOpenKeys] = React.useState(['interspace'])
  const onOpenChange = keys => {
    console.log(keys, '-keyys-', openKeys, rootSubmenuKeys)
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1)

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }
  const [selectedKeys, setSelectedKeys] = React.useState(['officesList'])
  const onClick = ({ item, key, keyPath, domEvent }) => {
    setSelectedKeys([key])
    console.log(item, key, keyPath, domEvent)
  }
  return (
    <Menu
      mode='inline'
      theme='light'
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      selectedKeys={selectedKeys}
      // defaultSelectedKeys={['officesList']}
      onClick={onClick}>
      {permissRouteList.map(route =>
        authInfoList.includes(route.meta.permission) ? (
          <SubMenu icon={<MailOutlined />} key={route.name} title={route?.meta?.title ?? ''}>
            {route.routes.map(item =>
              authInfoList.includes(item.meta.permission) ? (
                !item.hiddenInMenu ? (
                  <Menu.Item key={item.name}>
                    <Link to={item.path}>{item?.meta?.title ?? ''}</Link>
                  </Menu.Item>
                ) : null
              ) : null
            )}
          </SubMenu>
        ) : null
      )}
    </Menu>
  )
}
const mapStateToprops = ({ auth: { authInfo } }) => {
  return { authInfo }
}

export default connect(mapStateToprops)(MyMenu)
