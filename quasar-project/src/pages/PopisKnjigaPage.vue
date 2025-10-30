<template>
  <div class="q-pa-md">
    <q-table
      class="my-sticky-dynamic"
      flat bordered
      title="Knjige"
      :rows="rows"
      :columns="columns"
      :loading="loading"
      row-key="index"
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
            :src="props.row.slika"
            alt="Naslovnica"
            class="rounded shadow-sm"
            style="width: 50px; height: 70px; object-fit: cover;"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref, computed, nextTick } from 'vue'

const columns = [
  { name: 'id', label: 'id', field: 'id', align: 'left', sortable: true, style: { fontSize:'14px' }, headerStyle: { fontSize: '18px' } },
  { name: 'naslov', label: 'Naslov Knjige', field: 'naslov', align: 'left', sortable: true, style: { fontSize:'14px' }, headerStyle: { fontSize: '18px' } },
  { name: 'autor', label: 'Autor', field: 'autor', align: 'left', sortable: true, style: { fontSize:'14px' }, headerStyle: { fontSize: '18px' }  },
  { name: 'opis', label: 'Opis', field: 'opis', style: { fontSize:'14px' }, headerStyle: { fontSize: '18px' } },
  { name: 'slika', label: 'Slika', field: 'slika', style: { fontSize:'14px' }, headerStyle: { fontSize: '18px' } },
  { name: 'status', label: 'Status', field: 'status', style: { fontSize:'14px' }, headerStyle: { fontSize: '18px' }}
]

const seed = [
  {
    id: 1,
    naslov: 'Na Drini ćuprija',
    autor: 'Ivo Andrić',
    opis: 'Roman koji prikazuje povijest jednog mosta i ljudi oko njega kroz stoljeća.',
    slika: 'https://cdn11.bigcommerce.com/s-81ui0dgxz3/images/stencil/1280x1280/products/1520/2954/060762__21552.1739283636.jpg?c=1',
    status: 'Dostupno'
  },
  {
    id: 2,
    naslov: 'Zločin i kazna',
    autor: 'Fjodor Dostojevski',
    opis: 'Klasik svjetske književnosti o moralnim dvojbama i iskupljenju.',
    slika: 'https://www.hocuknjigu.hr/getmedia/9c4db028-f87f-4932-86e7-989ed129a69d/9789533200613.jpg',
    status: 'Posuđeno'
  },
  {
    id: 3,
    naslov: 'Prokleta avlija',
    autor: 'Ivo Andrić',
    opis: 'Priča o zatvoru u Istanbulu i ljudima različitih sudbina koji se u njemu susreću.',
    slika: 'https://libri.hr/upload_data/site_photos/prokleta-avlija-i.a..jpg',
    status: 'Dostupno'
  },
  {
    id: 4,
    naslov: 'Judita',
    autor: 'Marko Marulić',
    opis: 'Ep o hrabroj Juditi koja spašava svoj narod, jedno od prvih djela hrvatske književnosti.',
    slika: 'https://www.matica.hr/media/_versions/knjige/judita-1358/judita-1358_large.jpeg',
    status: 'Dostupno'
  },
  {
    id: 5,
    naslov: 'Alkar',
    autor: 'Dinko Šimunović',
    opis: 'Priča o mladiću koji se želi dokazati kao alkar u Sinju.',
    slika: 'https://knjiga.hr/wp-content/uploads/product-images/107834/107834.jpg',
    status: 'Na rezervaciji'
  },
  {
    id: 6,
    naslov: 'Breza',
    autor: 'Slavko Kolar',
    opis: 'Dirljiva pripovijetka o jednostavnoj ženi u ruralnom okruženju i njenoj sudbini.',
    slika: 'https://www.knjizaranova.hr/image/cache/catalog/breza-570x678.PNG',
    status: 'Dostupno'
  },
  {
    id: 7,
    naslov: 'Kiklop',
    autor: 'Ranko Marinković',
    opis: 'Antiratni roman o intelektualcu koji pokušava pronaći smisao uoči Drugog svjetskog rata.',
    slika: 'https://www.hocuknjigu.hr/getmedia/ab04fdc3-b765-4caa-a2b8-9ec4bf1dc468/9789530607217.jpg',
    status: 'Posuđeno'
  },
  {
    id: 8,
    naslov: 'Priče iz davnine',
    autor: 'Ivana Brlić-Mažuranić',
    opis: 'Zbirka bajki nadahnutih slavenskom mitologijom, omiljena među djecom i odraslima.',
    slika: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl_jRBgTdynoXq9XhncmauDU4KSS8nJriF9w&s',
    status: 'Dostupno'
  },
  {
    id: 9,
    naslov: 'Gospoda Glembajevi',
    autor: 'Miroslav Krleža',
    opis: 'Drama o raspadu bogate zagrebačke obitelji i kritika društvenih elita.',
    slika: 'https://knjiga.hr/wp-content/uploads/product-images/064563/064563.jpg',
    status: 'Posuđeno'
  },
  {
    id: 10,
    naslov: 'Tena',
    autor: 'Josip Kozarac',
    opis: 'Roman o ljepoti, ponosu i propasti mlade žene u slavonskom društvu 19. stoljeća.',
    slika: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Onm1o8RCgXDOECCyqDR5LS60L7j16dGhBw&s',
    status: 'Dostupno'
  }
]

const allRows = seed


const pageSize = 50 
const lastPage = Math.ceil(allRows.length / pageSize)

export default {
  setup () {
    const nextPage = ref(2)
    const loading = ref(false)

    const rows = computed(() => allRows.slice(0, pageSize * (nextPage.value - 1)))

    return {
      columns,
      rows,

      nextPage,
      loading,

      pagination: { rowsPerPage: 0 },

      onScroll ({ to, ref }) {
        const lastIndex = rows.value.length - 1

        if (loading.value !== true && nextPage.value < lastPage && to === lastIndex) {
          loading.value = true

          setTimeout(() => {
            nextPage.value++
            nextTick(() => {
              ref.refresh()
              loading.value = false
            })
          }, 500)
        }
      }
    }
  }
}
</script>

<style lang="sass">
.my-sticky-dynamic
  /* height or max-height is important */
  max-height: 450px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
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