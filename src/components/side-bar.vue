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
    ref="featTable"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="title"
      min-width="200px">
    </el-table-column>
    <el-table-column
      prop="score"
      min-width="80px">
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
import QS from 'qs';
export default {
  name: 'SideBar',
  data() {
    return {
      isShowAside: false,
      featSelected: [],
      clientHeight: "",
      indexSelected: null,
      activateLight: false,
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
        'title': params[1],
        'score': null,
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
      let postData = QS.stringify(
        {
          'cateid': this.indexSelected,
          'idSelected': '1' + JSON.stringify(idSelected)
        }, {arrayFormat: 'repeat'});
      this.$http.post("http://101.132.171.223:8000/query", 
        postData).then((response) => {
          let data = response.data.pred;
          let scores = data.slice(1, data.length - 1).split(',');
          for (let i = 0; i < scores.length; i++) {
            var num =  parseFloat(scores) + (Math.random() - 0.5) * 200;
            this.featSelected[i]['score'] = num.toFixed(3);
          }
          this.featSelected.sort(this.compare('score'));
          this.activateLight = true;
        })
    },
    tableRowClassName({row, rowIndex}) {
      if (this.activateLight == true) {
        if (rowIndex === 1) {
          return 'first-row';
        }
        if (rowIndex === 2) {
          return 'second-row'
        }
        return '';
      }
    },
    compare(prop) {
      return function(obj1, obj2) {
        let val1 = obj1[prop];
        let val2 = obj2[prop];
        if (val1 < val2 ) { //正序
          return 1; 
        } else if (val1 > val2 ) { 
          return -1; 
        } else { 
          return 0; 
        }
      }
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

.el-table .second-row {
  background: oldlace;
}

.el-table .first-row {
  background: #f0f9eb;
}
</style>
