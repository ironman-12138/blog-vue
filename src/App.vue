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
</style>
