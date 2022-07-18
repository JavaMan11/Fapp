//引入mockjs模块  注意要大写，mock是一个对象
import Mock from 'mockjs';
//把json数据引入进来   [没有对外暴露 但是可以引入]
//webpack默认对外暴露的有：图片  json数据格式
import banner from './banner.json';
import floor from './floor.json';

//mock数据  第一个参数是请求地址  第二个参数是  请求数据
Mock.mock("/mock/banner", { code: 200, data: banner }) //首页大轮播图
Mock.mock("/mock/floor", { code: 200, data: floor }) //小轮播图

