<template>
  <div id='nav-header'>
    <div>
      <el-button 
        @click="updateMenuState"
        :type="btnType" 
        icon="el-icon-s-operation" 
        size="small" 
        circle></el-button>
    </div>
    <div id='title'>{{title}}</div>
    <div id='nav'>
      <a id='avatar' href='https://hanwgeek.github.io/'>
        <img :src='avatar'>
      </a>
      <a id='avatar_2' href='#'>
        <img :src='ava_xu'>
      </a>
      <a id='avatar_3' href='#'>
        <img :src='ava_zhen'>
      </a>
      <a id='avatar_4' href='#'>
        <img :src='ava_liu'>
      </a>
    </div>
  </div>
</template>


<script>
export default {
  name: 'NavHeader',
  data () {
    return {
      title: 'RestRec',
      avatar: require("../assets/avatar.jpg"),
      ava_xu: require("../assets/ava_xu.jpg"),
      ava_liu: require("../assets/ava_liu.jpg"),
      ava_zhen: require("../assets/ava_zhen.jpg"),
      isShowAside: false,
      btnType: 'info'
    }
  },
  methods: {
    updateMenuState() {
      this.btnType = this.btnType == "info" ? "primary" : "info";
    }
  }
}
</script>

<style scoped>
#nav-header {
  position: fixed;
  height: 40px;
  width: 100%;
  padding: 10px 50px;
  line-height: 40px;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: #fff;
  box-shadow: 0 0 1px rgba(0,0,0,0.25);
}

#title {
  font-size: 24px;
  float: left;
  vertical-align: center;
}

.el-button {
  position: fixed;
  left: 10px;
  top: 15px;
  padding: 10px;
  /* height: 40px; */
}


#avatar img{
  position: fixed;
  right: 15px;
  height: 40px;
  border-radius: 50%;
}

#avatar_2 img{
  position: fixed;
  right: 65px;
  height: 40px;
  border-radius: 50%;
}

#avatar_3 img{
  position: fixed;
  right: 115px;
  height: 40px;
  border-radius: 50%;
}

#avatar_4 img{
  position: fixed;
  right: 165px;
  height: 40px;
  border-radius: 50%;
}

</style>


