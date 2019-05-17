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
        zoom: 11
      });
      map.on('load', function () {
          map.loadImage('https://i.loli.net/2019/05/17/5cde27b63b76c77641.png', function(error, image) {
              if (error) throw error;
          map.addImage('icon', image);
      });
          map.addLayer({
            'id': 'rest',
             'type': 'symbol',
             "source": {
             "type": "vector",
             'scheme': 'tms',
              "tiles": ["http://localhost:8080/geoserver/gwc/service/tms/1.0.0/housep%3Ahousep@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf"],
          },
            'source-layer': 'housep',
          'layout': {
              "icon-image":"icon",
              "icon-allow-overlap": true,
              "icon-ignore-placement": false,
              "icon-size": 0.18
          },
          'paint': {
              "icon-opacity": 0.8
          },
        });

      });

      this.map = map;
      map.on('mousedown', 'rest', this.sendFeatSelected);

        var popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });
        map.on('mouseenter','rest',function(e){
            map.getCanvas().style.cursor = 'pointer';
            var coordinates = e.features[0].geometry.coordinates.slice();
            var description = e.features[0].properties.title;
            var feat = map.queryRenderedFeatures(e.point)[0];
            console.log(feat);
            this.price = feat.properties["price"];
            this.area= feat.properties["area"];
            this.type = feat.properties["type"];
            this.address = feat.properties["address"];
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            popup.setLngLat(coordinates)
                .setHTML( '<h3>'+ this.type+'  &nbsp;&nbsp;' + this.address + '</h3><font size="2">'+ description+ '</font><p>'+ this.price+ '元/月'+ ' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+ this.area+ '平方米'+ '</p>')
                .addTo(map);
        });
        map.on('mouseleave', 'rest', function() {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });
    },
    sendFeatSelected(e){
      var feat = this.map.queryRenderedFeatures(e.point)[0];
      this._id = feat.properties["_id"];
      this.address = feat.properties["address"];
      this.$bus.$emit("getFeatSelected", [this._id, this.address]);
    },
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
    .marker {
        /*background-image: url('/build/logo.png');*/
        background-size: cover;
        width: 30px;
        height: 30px;
        border-radius: 40%;
        cursor: pointer;
    }
    popup {
        max-width: 200px;
    }
    popup.content {
        text-align: center;
        font-family: 'Open Sans', sans-serif;
    }
</style>
