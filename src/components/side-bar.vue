<template>
<transition name="fade">
<div id="side-bar" v-show="isShowAside">
  <el-select v-model="indexSelected" placeholder="请选择类型">
    <el-option
      v-for="item in options"
      :key="item.cateID"
      :label="item.cate"
      :value="item.cateID">
    </el-option>
  </el-select>
  <el-button 
    @click="handleCalc"
    type="primary" 
    round>提交计算</el-button>
  <el-table 
    :data="this.featSelected"
    :show-header="false"
    ref="featTable">
    <el-table-column
      prop="title"
      min-width="240px">
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
import QS from 'qs'
export default {
  name: 'SideBar',
  data() {
    return {
      isShowAside: false,
      featSelected: [],
      clientHeight: "",
      indexSelected: null,
      options: [{
        cateID: 1,
        cate: '蛋糕甜点'
      }, {
        cateID: 2,
        cate: '地方菜'
      }, {
        cateID: 3,
        cate: '海鲜'
      }, {
        cateID: 4,
        cate: '火锅'
      }, {
        cateID: 5,
        cate: '咖啡酒吧'
      }, {
        cateID: 6,
        cate: '其他'
      }, {
        cateID: 7,
        cate: '日韩料理'
      }, {
        cateID: 8,
        cate: '烧烤香锅'
      }, {
        cateID: 9,
        cate: '西餐'
      }, {
        cateID: 10,
        cate: '小吃快餐'
      }, {
        cateID: 11,
        cate: '自助餐'
      }]
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
    deleteFeat(index, r) {
      this.featSelected.splice(index, 1);
    },
    changeFixed(clientHeight) {
      this.$refs.featTable.$el.style.height = clientHeight - 90 + 'px';
    },
    handleCalc() {
      if (this.featSelected.length == 0) {
        this.$message.error('请选择商铺!');
        return;
      }
      var idSelected = this.featSelected.map(o => (o._id));
      console.log(idSelected);
      let postData = QS.stringify(
        {
          'cateid': this.indexSelected,
          'idSelected': '1' + JSON.stringify(idSelected)
        }, {arrayFormat: 'repeat'});
      // let param = new URLSearchParams();
      // param.append('cateid', '1');
      // param.append('idSelected', '[1,2]');
      // this.$http.post("http://101.132.171.223:8000/query", 
      // param).then((response) => {
      //   console.log(response);
      // })
      this.$http.post("http://101.132.171.223:8000/query", postData)
    }
  }
}
</script>

<style scoped>
#side-bar{
    background-color: #ffffff;
    color: #828692;
    left: 0;
    text-align: center;
    line-height: 40px;
    position: fixed;
    z-index: 101;
}

.el-dropdown {
  widows: 100px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
