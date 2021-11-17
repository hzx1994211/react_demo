import { ACCESS_TOKEN, SET_USERINFO } from '../ActionTypes/authActionType'
export const setAuth = data => {
  return {
    type: ACCESS_TOKEN,
    payload: data
  }
}
export const setUserInfo = data => {
  return {
    type: SET_USERINFO,
    payload: data
  }
}
