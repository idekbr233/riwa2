<template>
  <div class="q-pa-md">
    <q-table
      class="my-sticky-dynamic"
      flat bordered
      title="Knjige"
      :rows="rows"
      :columns="columns"
      :loading="loading"
      row-key="id"
      virtual-scroll
      :virtual-scroll-item-size="48"
      :virtual-scroll-sticky-size-start="48"
      :pagination="pagination"
      :rows-per-page-options="[0]"
      @virtual-scroll="onScroll"
    >
      <template v-slot:body-cell-slika="props">
        <q-td :props="props">
          <img
            v-if="props.row.slika"
            :src="props.row.slika.startsWith('http') ? props.row.slika : `http://localhost:3000${props.row.slika}`"
            alt="Slika"
            class="rounded shadow-sm"
            style="width: 50px; height: 70px; object-fit: cover;"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref, nextTick } from 'vue'
import axios from 'axios'

const columns = [
  { name: 'id', label: 'id', field: 'id', align: 'left', sortable: true, style: { fontSize:'14px' }, headerStyle: { fontSize: '18px' } },
  { name: 'naslov', label: 'Naslov Knjige', field: 'naslov', align: 'left', sortable: true, style: { fontSize:'14px' }, headerStyle: { fontSize: '18px' } },
  { name: 'autor', label: 'Autor', field: 'autor', align: 'left', sortable: true, style: { fontSize:'14px' }, headerStyle: { fontSize: '18px' }  },
  { name: 'opis', label: 'Opis', field: 'opis', style: { fontSize:'14px' }, headerStyle: { fontSize: '18px' } },
  { name: 'slika', label: 'Slika', field: 'slika', style: { fontSize:'14px' }, headerStyle: { fontSize: '18px' } },
  { name: 'status', label: 'Status', field: 'status', style: { fontSize:'14px' }, headerStyle: { fontSize: '18px' }}
]

export default {
  setup () {
    const rows = ref([])
    const loading = ref(false)
    const nextPage = ref(1)
    const pageSize = 50
    const lastPage = ref(false)

    const pagination = { rowsPerPage: 0 }

    const loadPage = async () => {
      if (loading.value || lastPage.value) return
      loading.value = true
      try {
        const response = await axios.get('http://localhost:3000/knjige', {
          params: { page: nextPage.value, pageSize }
        })
        
        const dataWithStatusText = response.data.map(item => ({
          ...item,
          status: Number(item.dostupno) === 1 ? 'Dostupno' : 'Nedostupno'
        }))

        if (dataWithStatusText.length < pageSize) lastPage.value = true
        rows.value.push(...dataWithStatusText)
        nextPage.value++
        await nextTick()
      } catch (err) {
        console.error(err)
      } finally {
        loading.value = false
      }
    }
    loadPage()

    const onScroll = ({ to }) => {
      if (to >= rows.value.length - 1) loadPage()
    }

    return { columns, rows, loading, pagination, onScroll }
  }
}
</script>

<style lang="sass">
.my-sticky-dynamic
  /* height or max-height is important */
  max-height: 450px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th 
    background-color: #00b4ff

  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
  thead tr:first-child th
    top: 0

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>