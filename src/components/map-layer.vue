<template>
  <div style="height:100%;width:100%;">
    <div ref="basicMapbox" :style="mapSize"></div>
  </div>
</template>
<script>
import mapboxgl from 'mapbox-gl'
export default {
  name: 'MapLayer',
  props: {
    mapWidth: {
      type: String
    },
    mapHeight: {
      type: String
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 初始化
    init () {
      mapboxgl.accessToken = 'pk.eyJ1IjoiZWF0aW4iLCJhIjoiY2p2ODJkMXdvMDJuejQwbW00d2wwam41ZCJ9.zPDUDlosxbcf4tb36vjvLA'
      const map = new mapboxgl.Map({
        container: this.$refs.basicMapbox,
        style: 'mapbox://styles/mapbox/streets-v9'
      })
      console.log(map)
    }
  },
  computed: {
    mapSize () {
      let styleObj = {
        width: this.mapWidth,
        height: this.mapHeight
      }
      return styleObj
    }
  }
}
</script>
<style>
@import url('https://api.tiles.mapbox.com/mapbox-gl-js/v0.45.0/mapbox-gl.css');
</style>