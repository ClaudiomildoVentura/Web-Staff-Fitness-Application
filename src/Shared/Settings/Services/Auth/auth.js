export const TOKEN_KEY = "@softWork-Token";
export const USER_ID='';
export const PLAN = '';
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== "@softWork-Token";
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getId = () => localStorage.getItem(USER_ID);
export const getPlan = () => localStorage.getItem(PLAN)
/*export function setUser(user) {
  localStorage.setItem(USER_EMAIL, user)
}*/

export function setPlan(plan){
  localStorage.setItem(PLAN, plan)
}

export function setId(user) {
  localStorage.setItem(USER_ID, user)
}

export function login(token) {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(PLAN);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_ID);
};
