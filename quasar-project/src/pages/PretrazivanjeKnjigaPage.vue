<template>
  <div class="q-pa-md">
    <div class="q-gutter-md flex items-center">
      <q-input
        v-model="search"
        label="Pretraži knjige"
        dense
        outlined
        class="col"
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
import { ref } from 'vue'

export default {
  setup() {
    const search = ref('')
    const searchByAutor = ref(true)
    const searchByNaslov = ref(false)

    const columns = [
      { name: 'naslov', label: 'Naslov', field: 'naslov', align: 'left' },
      { name: 'autor', label: 'Autor', field: 'autor', align: 'left' },
      { name: 'status', label: 'Status', field: 'status', align: 'left' }
    ]

    const rows = ref([
      { id: 1, naslov: 'Na Drini ćuprija', autor: 'Ivo Andrić', status: 'Dostupno' },
      { id: 2, naslov: 'Zločin i kazna', autor: 'Fjodor Dostojevski', status: 'Posuđeno' },
      { id: 3, naslov: 'Prokleta avlija', autor: 'Ivo Andrić', status: 'Dostupno' },
      { id: 4, naslov: 'Judita', autor: 'Marko Marulić', status: 'Dostupno' },
      { id: 5, naslov: 'Alkar', autor: 'Dinko Šimunović', status: 'Na rezervaciji' },
      { id: 6, naslov: 'Breza', autor: 'Slavko Kolar', status: 'Dostupno' },
      { id: 7, naslov: 'Kiklop', autor: 'Ranko Marinković', status: 'Posuđeno' },
      { id: 8, naslov: 'Priče iz davnine', autor: 'Ivana Brlić-Mažuranić', status: 'Dostupno' },
      { id: 9, naslov: 'Gospoda Glembajevi', autor: 'Miroslav Krleža', status: 'Posuđeno' },
      { id: 10, naslov: 'Tena', autor: 'Josip Kozarac', status: 'Dostupno' }
    ])

    const filteredRows = ref(rows.value)

    const doSearch = () => {
      const term = search.value.toLowerCase()
      filteredRows.value = rows.value.filter((book) => {
        if (searchByAutor.value && book.autor.toLowerCase().includes(term)) return true
        if (searchByNaslov.value && book.naslov.toLowerCase().includes(term)) return true
        return false
      })
    }

    return { search, searchByAutor, searchByNaslov, doSearch, columns, filteredRows }
  }
}
</script>