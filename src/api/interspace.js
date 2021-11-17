import _http from '../utils/axios'
//写字楼列表
export function getProjectObjectList (parameter) {
  return _http({
    url: 'project/object-list',
    method: 'get',
    params: parameter
  })
}
//写字楼创建
export function projectCreateObject (parameter) {
  return _http({
    url: 'project/create-object',
    method: 'post',
    data: parameter
  })
}
//写字楼编辑
export function projectEditObject (parameter) {
  return _http({
    url: 'project/edit-object',
    method: 'post',
    data: parameter
  })
}
//写字楼删除
export function projectDelObject (parameter) {
  return _http({
    url: 'project/del-object',
    method: 'post',
    data: parameter
  })
}
//写字楼上下架状态接口
export function projectEditStatus (parameter) {
  return _http({
    url: 'project/edit-status',
    method: 'post',
    data: parameter
  })
}
//写字楼业主列表
export function getProjectObjectDetail (parameter) {
  return _http({
    url: 'project/object-detail',
    method: 'get',
    params: parameter
  })
}

//获取写字楼的省份数据
export function getRegion (parameter) {
  return _http({
    url: 'setting/get-region',
    method: 'get',
    params: parameter
  })
}
//获取级联需要的省市数据
export function getRegionList (parameter) {
  return _http({
    url: 'setting/region-list',
    method: 'get',
    params: parameter
  })
}
//获取级联需要的省市数据
export function getCityRegin (parameter) {
  return _http({
    url: 'setting/get-city-region',
    method: 'get',
    params: parameter
  })
}

//获取物业公司列表
export function getPropertyList (parameter) {
  return _http({
    url: 'setting/property-list',
    method: 'get',
    params: parameter
  })
}
//获取开发商列表
export function getDeveloperList (parameter) {
  return _http({
    url: 'setting/developer-list',
    method: 'get',
    params: parameter
  })
}

//获取标签列表
export function getLabelList (parameter) {
  return _http({
    url: 'setting/label-list',
    method: 'get',
    params: parameter
  })
}

//获取房源列表
export function getHouseList (parameter) {
  return _http({
    url: 'house/house-list',
    method: 'get',
    params: parameter
  })
}

//获取房源详情
export function getHouseDetail (parameter) {
  return _http({
    url: 'house/house-detail',
    method: 'get',
    params: parameter
  })
}
// //获取房源详情
// export function getHouseDetail (parameter) {
//   return _http({
//     url: 'owner/house-detail',
//     method: 'get',
//     params: parameter
//   })
// }
//房源编辑
export function editHouseDetail (parameter) {
  return _http({
    url: 'owner/house-edit',
    method: 'post',
    data: parameter
  })
}

// 写字楼楼栋新增
export function addObjectBuilding (parameter) {
  return _http({
    url: 'project/add-object-building',
    method: 'post',
    data: parameter
  })
}

// 写字楼楼栋编辑
export function editObjectBuilding (parameter) {
  return _http({
    url: 'project/edit-object-building',
    method: 'post',
    data: parameter
  })
}

// 写字楼楼栋删除
export function delObjectBuilding (parameter) {
  return _http({
    url: 'project/object-building-del',
    method: 'post',
    data: parameter
  })
}

//写字楼楼栋详情
export function objectBuildingDetail (parameter) {
  return _http({
    url: 'project/object-building-detail',
    method: 'get',
    params: parameter
  })
}
