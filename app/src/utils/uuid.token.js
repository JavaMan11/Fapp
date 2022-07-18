import { v4 as uuidv4 } from 'uuid'
//生成一个随机字符串，且每次执行不能发生变化，游客身份持久储存
export const getUUID = () => {
    //先在本地储存获取uuid 看一下本地储存里面有没有uuid
    //如果有则不走if语句
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    //如果没有
    if (!uuid_token) {
        //生成uuid
        uuid_token = uuidv4();
        //然后再本地储存一次
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    //切记要有返回值
    return uuid_token;
}