/*
 * @Author: renweijun@doctorwork.com
 * @LastEditTime: 2020-06-11 15:13:56
 * @Description: 
 * @FilePath: /demo/src/plugins/element.js
 */ 
import Vue from 'vue'
import { Button, Form, Input, FormItem, Upload,Message } from 'element-ui'


console.log('注册')
Vue.use(Button)
Vue.use(Form)
Vue.use(Input)
Vue.use(FormItem)
Vue.use(Upload)
Vue.prototype.$message = Message;