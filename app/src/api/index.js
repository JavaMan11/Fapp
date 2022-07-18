//当前这个模块：API进行统一管理
import requests from "./request";
import mockRequests from './mockAjax'
//三级联动的接口
///api/product/getBaseCategoryList  get请求  无参数

//发请求:axios发请求返回的结果是Promise对象
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' });

//首页轮播图接口
export const reqGetBannerList = () => mockRequests.get('/banner');

//floor接口
export const reqFloorList = () => mockRequests.get('/floor');

//search接口(获取搜索模块数据)  调用这个函数的时候  params参数至少是一个空对象
export const reqGetSearchInfo = (params) => requests({ url: "/list", method: "post", data: params })

//detail接口(获取商品详情)
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })

//将产品添加到购物车（获取更新产品的个数） /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

//购物车列表接口  /api/cart/cartList
export const reqCartList = () => requests({ url: '/cart/cartList', method: "get" })

//删除购物车接口 /api/cart/deleteCart/{skuId}
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

//购物车商品选中状态
export const reqUpdateCheckedById = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}` })

//获取注册验证码
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

//注册接口
export const reqUserRegister = (data) => requests({ url: '/user/passport/register', data, method: 'post' })

//登录接口
export const reqUserLogin = (data) => requests({ url: '/user/passport/login', data, method: 'post' })

//获取登录信息接口
export const reqGetUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })

//退出登录接口
export const reqLoginOut = () => requests({ url: '/user/passport/logout', method: 'get' })

//获取用户地址信息 /user/userAddress/auth/findUserAddressList
export const reqAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })

//获取商品清单信息
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' })

//提交订单接口 /order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })

//获取订单支付信息
export const reqOrderPay = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })

//查询支付订单状态 /payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: "get" })

//获取我的订单列表 /order/auth/{page}/{limit}
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })