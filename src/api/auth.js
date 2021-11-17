import _http from '../utils/axios'

export function accountLogin (parameter) {
  return _http({
    url: 'auth/account-login',
    method: 'post',
    data: parameter
  })
}
export function sysAuthInfo (parameter) {
  return _http({
    url: 'sysauth/auth-info',
    method: 'get',
    params: parameter
  })
}
export function smsLogin (parameter) {
  return _http({
    url: 'auth/sms-login',
    method: 'post',
    data: parameter
  })
}
export function sendVerificationCode (parameter) {
  return _http({
    url: 'common/send-verification-code',
    method: 'post',
    data: parameter
  })
}
