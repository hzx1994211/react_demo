import React from 'react'

import LoginStyles from './index.module.scss'
import classnames from 'classnames'
import LogoImage from '@/assets/images/login_logo.png'
import TitleImage from '@/assets/images/login_title.png'
import LoginForm from './components/LoginForm'
import { Tabs } from 'antd'
const { TabPane } = Tabs
const tabList = [
  { title: '密码登录', key: 'password' },
  { title: '验证码登录', key: 'captcha' }
]
export default class Login extends React.Component {
  render () {
    return (
      <div className={classnames(LoginStyles.login_wrap)}>
        <div className={LoginStyles.logo_wrap}>
          <img src={LogoImage} alt='' />
          <img className={LoginStyles.titleImg} src={TitleImage} alt='' />
        </div>
        <div className={LoginStyles.login_form}>
          <Tabs>
            {tabList.map(tab => {
              return (
                <TabPane tab={tab.title} key={tab.key}>
                  <LoginForm tabKey={tab.key} />
                </TabPane>
              )
            })}
          </Tabs>
        </div>
      </div>
    )
  }
}
