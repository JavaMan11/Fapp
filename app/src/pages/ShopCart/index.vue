<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cart, index) in cartInfoList"
          :key="cart.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked == 1"
              @change="updateChecked(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{ cart.skuName }}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.cartPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="DeleteCart(cart)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isCheckedAll&&cartInfoList.length>1" @change="AllChecked" />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteCheckedAllCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>{{CheckedHandler}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" >结算</a> -->
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  computed: {
    ...mapGetters(["cartlist"]),
    //购物车数据
    cartInfoList() {
      return this.cartlist.cartInfoList || [];
    },
    //计算产品的总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        sum += item.skuNum * item.cartPrice;
      });
      return sum;
    },
    //全选or全不选
    isCheckedAll() {
      //用every遍历更方便，只要有一个不等于1就返回false
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
    //已选择的商品
    CheckedHandler(){
      let checkedSum = 0;
      this.cartInfoList.forEach((item)=>{
        if(item.isChecked==1){
          checkedSum+=1
        }
      })
      return checkedSum
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    //获取个人购物车数据
    getData() {
      this.$store.dispatch("getCartList");
    },
    //购物车 + -个数
    handler: throttle(async function (type, disNum, cart) {
      //type:区分 + - input  disNum：变化了多少   cart.skuId:我点的是哪个产品
      // console.log(type,disNum,cart.skuId);
      switch (type) {
        //点击加号 加一
        case "add":
          disNum = 1;
          break;
        case "minus":
          //判断skuNum大于1 才给服务器传递-1 因为没有买东西不能继续-1了
          disNum = cart.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          //如果用户输入的是非数字，让他回到刚刚的值
          //也就是变化量disNum为0
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            //正常现象中也有一种奇葩现象，就是有小数  12.5
            disNum = parseInt(disNum) - cart.skuNum;
          }
          break;
      }
      try {
        await this.$store.dispatch("addOrUpdateShopCart", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    }, 1000),
    //购物车删除键
    async DeleteCart(cart) {
      try {
        await this.$store.dispatch("getDeleteById", cart.skuId);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //购物车选中状态
    async updateChecked(cart, event) {
      try {
        let isChecked = event.target.checked ? "1" : "0";
        await this.$store.dispatch("getUpdataChecked", {
          skuId: cart.skuId,
          isChecked,
        });
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //删除选中的商品
  async  deleteCheckedAllCart(){
     try {
       //无法拿到id 要派发一个action
       await this.$store.dispatch('deleteCheckedAllCart');
       this.getData();
     } catch (error) {
       alert(error.message)
     }
    },
 async AllChecked(event){
    try {
      let isChecked = event.target.checked?'1':'0'
     await this.$store.dispatch('AllChecked',isChecked)
      this.getData();
    } catch (error) {
      alert(error.message)
    }
  }
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>