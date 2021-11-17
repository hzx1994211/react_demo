import React from 'react'
// import { accountLogin, smsLogin } from '@/api/auth'
import { accountLogin, sysAuthInfo } from '@/api/auth'
import { Form, Input, Button, message } from 'antd'
import { withRouter } from 'react-router'
import './LoginForm.scss'
import { setToken } from '@/utils/token'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import * as actionCreator from '@/store/authActionCreators/authActionCreators'
import * as actionCreator from '../../../store/ActionCreators/authActionCreators'
const LoginForm = props => {
  const [loginForm] = Form.useForm()
  const phoneReg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  const doLogin = async values => {
    if (props.tabKey === 'password') {
      const res = await accountLogin(values)
      message.success('登录成功')
      setToken(res.token)
      const userInfoResult = await sysAuthInfo()
      props.setUserInfo(userInfoResult ?? {})
      props.history.push('/interspace/officesList')
    }
  }
  const validatorPhone = (rule, value, cb) => {
    if (value && value.trim() !== '') {
      if (phoneReg.test(value)) {
        cb()
      } else {
        cb('请输入正确的手机号')
      }
    } else {
      cb('手机号不能为空')
    }
  }
  const validatorSmsCode = (rule, value, cb) => {
    if (value && value.trim() !== '') {
      if (String(value.trim()).length !== 4) cb('请输入四位验证码')
    } else {
      cb('验证码不能为空')
    }
  }
  const rules = {
    account: [{ required: true, message: '请输入账号名' }],
    password: [{ required: true, message: '密码不能为空' }],
    phone: [{ validator: validatorPhone }],
    smsCode: [{ validator: validatorSmsCode }]
  }

  const addonAfter = (title, fn) => (
    <span className='addon_after_wrap' onClick={fn}>
      {title}
    </span>
  )
  const getCaptcha = () => {
    console.log('get Code')
  }
  return (
    <Form
      name='loginForm'
      form={loginForm}
      layout='vertical'
      onFinish={doLogin}
    >
      {props.tabKey === 'password' ? (
        <div>
          <Form.Item label='账号' name='account' rules={rules.account}>
            <Input />
          </Form.Item>
          <Form.Item label='密码' name='password' rules={rules.password}>
            <Input.Password />
          </Form.Item>
        </div>
      ) : (
        <div>
          <Form.Item label='手机号码' name='account' rules={rules.phone}>
            <Input />
          </Form.Item>
          <Form.Item label='验证码' name='sms_code' rules={rules.smsCode}>
            <Input addonAfter={addonAfter('获取验证码', getCaptcha)} />
          </Form.Item>
        </div>
      )}
      <Form.Item>
        <Button type='primary' htmlType='submit' className='login-form-button'>
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}
const mapStateToprops = state => {
  return {}
}

// setUserInfo
const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreator, dispatch)
}

export default connect(
  mapStateToprops,
  mapDispatchToProps
)(withRouter(LoginForm))
