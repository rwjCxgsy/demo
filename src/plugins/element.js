/*
 * @Author: renweijun@doctorwork.com
 * @LastEditTime: 2020-06-12 10:07:43
 * @Description:
 * @FilePath: /demo/src/plugins/element.js
 */

import Vue from "vue";
import {
  Button,
  Form,
  Input,
  FormItem,
  Upload,
  Message,
  Row,
  Col,
  Header,
  Divider
} from "element-ui";

console.log("注册");
Vue.use(Button);
Vue.use(Form);
Vue.use(Input);
Vue.use(FormItem);
Vue.use(Upload);
Vue.use(Row);
Vue.use(Col);
Vue.use(Header);
Vue.use(Divider);
Vue.prototype.$message = Message;
