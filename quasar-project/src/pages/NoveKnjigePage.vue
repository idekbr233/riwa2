<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card v-for="knjiga in knjige" :key="knjiga.id" class="my-card">
      <img v-if="knjiga.slika" :src="knjiga.slika.startsWith('http') ? knjiga.slika : `http://localhost:3000${knjiga.slika}`" alt="Slika knjige">

      <q-card-section>
        <div class="text-h6">{{ knjiga.naslov }}</div>
        <div class="text-subtitle2">{{ knjiga.autor }}</div>
        <div class="text">{{ knjiga.opis }}</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  setup() {
    const knjige = ref([])

    onMounted(async () => {
      try {
        const response = await axios.get('http://localhost:3000/nove-knjige')
        // mapiramo status ako želiš, npr. status = Dostupno/Nedostupno
        knjige.value = response.data.map(item => ({
          ...item,
          status: Number(item.dostupno) === 1 ? 'Dostupno' : 'Nedostupno'
        }))
      } catch (err) {
        console.error(err)
      }
    })

    return { knjige }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>