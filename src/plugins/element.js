/*
 * @Author: renweijun@doctorwork.com
 * @LastEditTime: 2020-07-02 16:09:22
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
  Divider,
  Dialog
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
Vue.use(Dialog);
Vue.prototype.$message = Message;
