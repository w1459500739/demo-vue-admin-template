const TOKEN_NAME = "2011_LEJU_TOKEN";
const USER_INFO_NAME = "2011_LEJU_USER_INFO_NAME";
export function getToken() {
  return window.localStorage.getItem(TOKEN_NAME);
}

export function setToken(token) {
  window.localStorage.setItem(TOKEN_NAME, token);
}

export function removeToken() {
  window.localStorage.removeItem(TOKEN_NAME);
}

export function getUserInfo() {
  return JSON.parse(window.localStorage.getItem(USER_INFO_NAME));
}

export function setUserInfo(username) {
  window.localStorage.setItem(USER_INFO_NAME, JSON.stringify(username));
}

export function removeUserInfo() {
  window.localStorage.removeItem(USER_INFO_NAME);
}

export function clearAll(){
    removeToken(),
    removeUserInfo()
}
