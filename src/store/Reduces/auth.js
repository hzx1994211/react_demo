import { ACCESS_TOKEN, SET_USERINFO } from '../ActionTypes/authActionType'
const initState = {
  userInfo: {},
  authInfo: {}
}
const auth = (state = initState, action) => {
  switch (action.type) {
    case SET_USERINFO:
      const newState = JSON.parse(JSON.stringify(state))
      newState.userInfo = action.payload?.user_info ?? {}
      newState.authInfo = action.payload?.auth_info ?? {}
      return newState
    case ACCESS_TOKEN:
      return action.payload

    default:
      return state
  }
}
export default auth
