<template>
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 300px">
      <q-input rounded outlined v-model="naslov" label="Naslov" />
      <q-input rounded outlined v-model="autor" label="Autor" />
      <q-input rounded outlined v-model="opis" label="Opis" />
      
      <q-file outlined v-model="model">
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
      </q-file>

      <q-checkbox
        left-label
        v-model="dostupnost"
        label="Dostupno?"
        checked-icon="task_alt"
        unchecked-icon="highlight_off"
      />

      <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 10px;">
        <q-btn color="primary" label="Spremi" @click="spremi" />
        <q-btn flat label="Odustani" @click="odustani" />
      </div>
    </div>
  </div>
  <div class="q-mt-md row items-start q-gutter-md">
    <q-card v-for="k in knjige" :key="k.id" class="my-card" style="max-width: 250px;">
      <img v-if="k.slika" :src="k.slika" alt="Slika knjige" style="width: 100%; height: 150px; object-fit: cover;" />
      <q-card-section>
        <div class="text-h6">{{ k.naslov }}</div>
        <div class="text-subtitle2">{{ k.autor }}</div>
        <div>{{ k.opis }}</div>
        <div>{{ k.dostupno }}</div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import {ref} from 'vue'
import axios from 'axios'

let naslov=ref('')
let autor=ref('')
let opis=ref('')
let model=ref(null)
let dostupnost=ref(false)
let knjige = ref([])

async function spremi() {
  try {
    const formData = new FormData()
    formData.append('naslov', naslov.value)
    formData.append('autor', autor.value)
    formData.append('opis', opis.value)
    formData.append('dostupnost', dostupnost.value ? 'true' : 'false')
    if (model.value) {
      formData.append('slika', model.value)
    }

    const response = await axios.post('http://localhost:3000/knjige', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    console.log('Uspješno spremljeno:', response.data)

    knjige.value.push({
      id: response.data.id,
      naslov: naslov.value,
      autor: autor.value,
      opis: opis.value,
      slika: response.data.slika ? `http://localhost:3000${response.data.slika}` : null,
      dostupno: dostupnost.value ? 'Dostupno' : 'Nedostupno'
    })

    naslov.value = ''
    autor.value = ''
    opis.value = ''
    model.value = null
    dostupnost.value = false
  } 
  catch (err) {
  console.error(err)
  }
}

function odustani() {
  naslov.value = ''
  autor.value = ''
  opis.value = ''
  model.value = null
  dostupnost.value = true
}
//instaliraj multer budalo
</script>