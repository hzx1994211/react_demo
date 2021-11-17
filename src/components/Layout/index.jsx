import React, { Component } from 'react'
import { Layout } from 'antd'
import MyBreadcrumb from '../Breadcrumb'
import MyMenu from '../MyMenu'
import renderRoutes from '@/utils/renderRoutes'
import './index.scss'
import Icon from '@/components/Icon'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Popover } from 'antd'
import {
  UserOutlined,
  SettingOutlined,
  PoweroffOutlined
} from '@ant-design/icons'
import { connect } from 'react-redux'

const { Header, Footer, Sider, Content } = Layout
class MyLayout extends Component {
  constructor (props) {
    console.log(props, 'propsprops')
    super(props)
    this.state = {
      collapsed: false,
      route: props.route
    }
  }
  onCollapse = collapsed => {
    this.setState({ collapsed })
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render () {
    const route = this.state.route
    const content = (
      <ul className='user-setting-content'>
        <li className='user-setting-item'>
          <SettingOutlined />
          <span className='title'>个人设置</span>
        </li>
        <li className='user-setting-item'>
          <PoweroffOutlined />
          <span className='title'>退出登录</span>
        </li>
      </ul>
    )
    const { name } = this.props.userInfo
    // console.log(route, 'route1route2')
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          style={{ backgroundColor: '#fff' }}
        >
          <div className='logo'>
            <Icon className='icon' type='icon-webyezhuduanlogoda' />
          </div>
          <MyMenu />
        </Sider>
        <Layout className='site-layout'>
          <Header
            className='site-layout-background'
            style={{ paddingLeft: '16px' }}
          >
            <div>
              {React.createElement(
                this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: 'trigger',
                  onClick: this.toggle
                }
              )}
            </div>
            <div className='user-setting'>
              <Popover placement='bottom' content={content} trigger='hover'>
                <UserOutlined />
                <span className='user-name'>{name}</span>
              </Popover>
            </div>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <MyBreadcrumb />
            <div className='site-layout-background' style={{ marginTop: 24 }}>
              {renderRoutes(route.routes)}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            ©2020 深圳市登科云信息科技有限公司. 粤ICP备2021040824号-1
          </Footer>
        </Layout>
      </Layout>
    )
  }
}
const mapStateToprops = ({ auth: { userInfo } }) => {
  return { userInfo }
}
export default connect(mapStateToprops)(MyLayout)
