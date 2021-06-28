<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: 'App',
    components:{
    }
  }
</script>

<style>
  #app{
    height: 100%;
    background: url("./assets/img/blogBack2.jpg");
    background-size: cover; 
    background-attachment:fixed;
    overflow: auto;
  }
  html,body{
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
  ::-webkit-scrollbar{
    width: 5px;/* 纵向滚动条*/
    height: 5px;/* 横向滚动条 */
    background-color: #fff;
  }

  /*定义滚动条轨道 内阴影*/
  ::-webkit-scrollbar-track{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0);
    background-color: #fff;
  }

  /*定义滑块 内阴影*/
  ::-webkit-scrollbar-thumb{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0);
    background-color: #D5D5D5;
  }
</style>
