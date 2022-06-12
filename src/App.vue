<template>
  <el-header class="header">
    <nav>
      <router-link to="/">Graph-1</router-link>
      <!-- <router-link to="/about">About</router-link> -->
    </nav>
  </el-header>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  mounted() {
    let header = document.querySelector('.header');
    let height = window.innerHeight - header.clientHeight;

    document.getElementById('app').style.height = `${height}px`;
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
}

nav {
  padding: 15px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #fbfbfb;
    }
  }
}
.header {
  background-color: #a0cfff;
}
</style>
