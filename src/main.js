import Vue from 'vue'
import App from './App.vue'
import VueMeta from 'vue-meta';
import Cookies from 'js-cookie'
import Storage from 'vue-ls';
import Vuet from 'vuet'

Vue.use(Vuet)
import router from './router'
import './plugins/element.js'

const vuet = new Vuet({
  // 实例的选项，详情往下看
})
vuet.addModules('test', {
  data () {
    return {
      count: 0
    }
  },
  fetch () {
    this.count = 1000
  },
  plus () {
    this.count++
  },
  reduce () {
    this.count--
  },
  modules: {
    // 可以添加子模块，会自动继承父模块的名称：路径 = 父模块名称/子模块名称
  }
})
const options = {
  namespace: 'vuejs__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local', // storage name session, local, memory
};

Vue.use(Storage, options);

Vue.use(VueMeta, {
  // optional pluginOptions
  keyName: 'head',
  // refreshOnceOnNavigation: true
})

Cookies.set('name_sb', 'value_sb', { expires: 365 });

console.log('element-ui')
Vue.config.productionTip = false

new Vue({
  router,
  vuet,
  render: h => h(App),
}).$mount('#app')


// function A (name = '小屁孩') {
//   this.name = name
// }



// function B (sex) {
//   A.call(this)
//   this.sex = sex
// }

// B.prototype = Object.create(A.prototype)
// B.prototype.constructor = B
// console.log(new B('男'))