<template>
  <q-page padding>
    <div id="map" style="height:500px;"></div>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue';
import * as L from 'leaflet';
import "leaflet/dist/leaflet.css";

export default {
  setup(){
    const initialMap = ref('');
    onMounted(() => {
        initialMap.value = L.map('map').setView([45.1269430612073, 14.789827216213967], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy;<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(initialMap.value);
      })
      return {
        initialMap
      }
    }
}
</script>
