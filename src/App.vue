<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  @font-face {
    font-family: 'iconfont';  /* project id 1610279 */
    src: url('//at.alicdn.com/t/font_1610279_vt8hk9jbc4.eot');
    src: url('//at.alicdn.com/t/font_1610279_vt8hk9jbc4.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_1610279_vt8hk9jbc4.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_1610279_vt8hk9jbc4.woff') format('woff'),
    url('//at.alicdn.com/t/font_1610279_vt8hk9jbc4.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_1610279_vt8hk9jbc4.svg#iconfont') format('svg');
  }

  .iconfont {
    font-family:"iconfont",sans-serif !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }

  #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
}
* {
  margin: 0;
  padding: 0;
  border: 0;
}
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

/* 滚动槽 */
::-webkit-scrollbar-track {
  /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);*/
  border-radius: 10px;
  width: 0px;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 0px;
  background: transparent;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}

::-webkit-scrollbar-thumb:window-inactive {
  background: transparent;
}
</style>
