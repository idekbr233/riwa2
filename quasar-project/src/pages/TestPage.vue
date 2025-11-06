<template>
  <q-page padding>
    <h1>{{ poruka }}</h1>
    <p v-text="tijelo"></p>
    <p v-html="htmlText"></p>
    <p v-text="htmlText"></p>
    <p v-for="item in days" :key="item">
      <button v-if="item=='Ponedjeljak'">
        {{ item }} *
      </button>
      <button v-else-if="item=='Petak'" v-show="false">
        {{ item }} 
      </button>
      <button v-else>
        {{ item }} 
      </button>
    </p>
  </q-page>
</template>

<script setup>
  const poruka = "Testno."
  const tijelo = "Ovo je tijelo."
  const htmlText = "<p><b>Ovo je html.</b> na stranici.</p>"
  const days = ['Ponedjeljak' , 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota', 'Nedjelja']
</script>
