import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api"
//封装游客身份模块 uuid 再引入进来 只能随机生成一次
import { getUUID } from "@/utils/uuid.token"
const state = {
    goodInfo: {},
    //游客临时身份
    uuid_token: getUUID()
}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
}
const actions = {
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        //服务器写入成功，没有返回数据，只是返回code==200，代表这次操作成功
        //因为服务器不需要给数据，是用户买什么就返回什么数据回购物车
        //所以不需要三连环存储数据
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        //加入购物车成功
        if (result.code == 200) {
            return 'OK'
        } else {
            //加入购物车失败
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {
    //state.goodInfo初始值是一个空对象，返回的是undefined 所以会出现一个假报错， ||{}是防止出现假报错
    //路径导航的简化
    categoryView(state) {
        return state.goodInfo.categoryView || {}
    },
    //产品信息的简化
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    //售卖属性的简化
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}