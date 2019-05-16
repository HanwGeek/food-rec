<template>
    <div style="height:100%;width:100%;text-align: left">
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
      map: null,
      icon: require('../assets/icon.svg'),
      feat: null,
      _id: null,
      title: null,
    }
  },
  mounted () {
    this.init();
  },
  methods: {
    init() {
      mapboxgl.accessToken = 'pk.eyJ1IjoiZWF0aW4iLCJhIjoiY2p2ODJkMXdvMDJuejQwbW00d2wwam41ZCJ9.zPDUDlosxbcf4tb36vjvLA';
      const map = new mapboxgl.Map({
        container: this.$refs.basicMapbox,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [114.305, 30.592],
        zoom: 14
      });
      map.on('load', function () {
        map.addLayer({
          'id': 'rest',
          'type': 'symbol',
          "source": {
            "type": "vector",
            'scheme': 'tms',
            "tiles": ["http://localhost:8080/geoserver/gwc/service/tms/1.0.0/fff%3Afff@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf"],
          },
          'source-layer': 'fff',
          'layout': {
              "symbol-avoid-edges": true,
              "icon-image":"restaurant-15",
              "icon-allow-overlap":true,
              "icon-size": 2
          },
          'paint': {
              "icon-opacity": 0.5
          },
        })
      });
      map.on('mousedown', 'rest', this.sendFeatSelected);
      this.map = map;
    },
    sendFeatSelected(e) {
      var feat = this.map.queryRenderedFeatures(e.point)[0];
      this._id = feat.properties["_id"];
      this.title = feat.properties["title"];
      this.$bus.$emit("getFeatSelected", [this._id, this.title]);
    }
  },
  computed: {
      mapSize () {
          return {
              width: this.mapWidth,
              height: this.mapHeight
          }
      }
  }
}
</script>
<style>
    /*.marker {*/
        /*background-image: url('/build/logo.png');*/
        /*background-size: cover;*/
        /*width: 30px;*/
        /*height: 30px;*/
        /*border-radius: 40%;*/
        /*cursor: pointer;*/
    /*}*/
    /*.mbgl-popup {*/
        /*max-width: 200px;*/
    /*}*/
    /*.mapboxgl-popup-content {*/
        /*text-align: center;*/
        /*font-family: 'Open Sans', sans-serif;*/
    /*}*/
</style>
