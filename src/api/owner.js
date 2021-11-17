import _http from '../utils/axios'
//写字楼列表
export function getOwnerList (parameter) {
  return _http({
    url: 'owner/list',
    method: 'get',
    params: parameter
  })
}

export function gaccountTypeList (parameter) {
  return _http({
    url: '/owner/account-type-list',
    method: 'get',
    params: parameter
  })
}
