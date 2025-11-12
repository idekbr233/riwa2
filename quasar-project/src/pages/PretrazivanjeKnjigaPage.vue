<template>
  <div class="q-pa-md">
    <div class="q-gutter-md flex items-center">
      <q-input
        v-model="search"
        label="Pretraži knjige"
        dense
        outlined
        class="col"
        @keyup.enter="doSearch"
      />
      <q-checkbox v-model="searchByAutor" label="Po autoru" />
      <q-checkbox v-model="searchByNaslov" label="Po naslovu" />
      <q-btn color="primary" label="Traži" @click="doSearch" />
    </div>

    <q-table
      flat
      bordered
      :rows="filteredRows"
      :columns="columns"
      row-key="id"
      class="q-mt-md"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  setup() {
    const search = ref('')
    const searchByAutor = ref(true)
    const searchByNaslov = ref(false)
    const filteredRows = ref([])

    const columns = [
      { name: 'naslov', label: 'Naslov', field: 'naslov', align: 'left' },
      { name: 'autor', label: 'Autor', field: 'autor', align: 'left' },
      { name: 'status', label: 'Status', field: 'status', align: 'left' }
    ]

    const doSearch = async () => {
      try {
        const response = await axios.get('http://localhost:3000/pretraga', {
          params: {
            term: search.value,
            byAutor: searchByAutor.value,
            byNaslov: searchByNaslov.value
          }
        })
        filteredRows.value = response.data
      } catch (err) {
        console.error(err)
      }
    }

    onMounted(() => {
      doSearch()
    })

    return { search, searchByAutor, searchByNaslov, filteredRows, columns, doSearch }
  }
}
</script>