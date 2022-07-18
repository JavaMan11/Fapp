//本地存储登录用户信息
export const setToken = (token) => {
    localStorage.setItem('TOKEN', token)
};
//拿到用户信息展示
export const getToken = () => {
    localStorage.getItem('TOKEN')
};
//清除所有本地储存的用户信息
export const removeToken = () => {
    localStorage.removeItem('TOKEN')
}