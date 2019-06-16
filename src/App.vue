<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Range from 'vue-time-range-picker'
import Demo from './components/demo.vue'
import { mapModules, mapRules } from 'vuet'
export default {
  mixins: [
    mapModules({
      test: 'test' // { 别名： '模块路径' }
    }),
    mapRules({
      once: [{ path: 'test' }] // { 规则: ['模块路径'] } 内置的规则和简写方式可以在下面看
    })
  ],
  name: 'app',
  head: {
    title: "sb 首页"
  },
  data () {
    return {
      show: false,
      dateRange: ['2019-08-01', '2019-09-01'],
      list: []
    }
  },
  methods: {
    onChange (data) {
      console.log(data)
      this.list = data.list
    }
  },
  components: {
    HelloWorld, Demo, Range
  },
  provide () {
    return {
      title: 'app'
    }
  },
  mounted () {
    // this.ls.set('foo', '124')
    console.log(this)
    this.$ls.set('foo', 'foo')

    const img = new Image()
    img.onload = (e) => {
      console.log(e)
      const canvas = document.createElement('canvas').getContext('2d')
      canvas.drawImage(img, 0, 0, img.width, img.height);
      var imgageData = canvas.getImageData(0, 0, img.width, img.height);        
      console.log(imgageData)
      console.log(URL.createObjectURL(new Blob([imgageData.data], {type: 'image/png'})))
    }
    img.src = require('./assets/logo.png')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
* {
  list-style: none;
}
</style>
