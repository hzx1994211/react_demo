const tokenName = 'DK-SYSTEM'
function setToken (token) {
  return localStorage.setItem(tokenName, token)
}
function getToken () {
  return localStorage.getItem(tokenName)
}
function isLogin () {
  return getToken()
}
function removeToken () {
  return localStorage.removeItem(tokenName)
}

export { setToken, getToken, isLogin, removeToken }
