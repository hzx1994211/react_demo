import _http from '../utils/axios'

//线索池列表
export function customersList(params) {
  return _http({
    url: 'potential/customers-list',
    method: 'get',
    params
  })
}
