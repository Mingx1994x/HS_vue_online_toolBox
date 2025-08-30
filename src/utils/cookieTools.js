const formatExpire = (expired) => {
  return new Date(expired * 1000).toUTCString()
}

export function setCookie(token, expired) {
  document.cookie = `HexTodoList=${token}; expires= ${formatExpire(expired)}`
}

export function getToken() {
  return document.cookie.replace(/(?:(?:^|.*;\s*)HexTodoList\s*=\s*([^;]*).*$)|^.*$/, "$1",);
}

export function removeToken() {
  document.cookie = "HexTodoList="
}