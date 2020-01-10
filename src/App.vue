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
