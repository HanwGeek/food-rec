<template>
  <div id="app">
    <el-container id="rec" ref="rec">
      <NavHeader />
      <SideBar/>
      <MapLayer mapWidth="100%" mapHeight="600px" />
      <Footer />
    </el-container>
  </div>
</template>

<script>
import NavHeader from '@/components/nav-header'
import Footer from '@/components/footer'
// import SideBar from '@components/side-bar'
import MapLayer from '@/components/map-layer'
import SideBar from "./components/side-bar";
export default {
  name: 'App',
  components: {
      SideBar,
    NavHeader,
    Footer,
    MapLayer
  },
  data() {
    return {
      clientHight: ''
    }
  },
  mounted() {
    this.clientHeight = `${document.documentElement.clientHeight}`;
    window.onresize = () => {
      this.clientHeight = `${document.documentElement.clientHeight}`;
    }
  },
  watch: {
    clientHeight: function () {
      this.changeFixed(this.clientHeight);
    }
  },
  methods: {
    changeFixed(clientHeight) {
      this.$refs.homePage.$el.style.height = clientHeight - 70 + 'px';
    },
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
