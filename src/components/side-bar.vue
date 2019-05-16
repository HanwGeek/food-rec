<template>
<transition name="fade">
<div id="side-bar" v-show="isShowAside">
  <el-table 
    :data="this.featSelected"
    :show-header="false"
    ref="featSelected">
    <el-table-column
      prop="title"
      min-width="170px">
    </el-table-column>
    <el-table-column>
      <template slot-scope="scope">
        <el-button size="small" type="danger" @click="deleteFeat(scope.$index, scope.row)" icon="el-icon-delete" circle></el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</transition>
</template>

<script>
export default {
  name: 'SideBar',
  data() {
    return {
      isShowAside: false,
      featSelected: []
    }
  },
  created() {
    this.$bus.$on("showAside", (isShowAside) => {
      this.isShowAside = isShowAside;
    });
    this.$bus.$on("getFeatSelected", (params) => {
      this.featSelected.push({
        '_id': params[0],
        'title': params[1]
      })
    })
  },
  methods: {
    deleteFeat(index, r) {
      this.featSelected.splice(index, 1);
    }
  }
}
</script>

<style scoped>
#side-bar{
    background-color: #3D464F;
    color: #828692;
    left: 0;
    text-align: center;
    line-height: 600px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

#side-bar {
  position: fixed;
  z-index: 101;
}
</style>
