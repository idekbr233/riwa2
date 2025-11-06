<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Quasar Aplikacija Projekt </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Naslovnica',
    caption: 'Početna stranica',
    icon: 'favorite',
    link: '#/',
  },
  {
    title: 'Nove knjige',
    caption: 'Popis novih knjiga',
    icon: 'school',
    link: '#/noveknjige',
  },
  {
    title: 'Popis',
    caption: 'Lista Knjiga',
    icon: 'school',
    link: '#/popisknjiga',
  },
  {
    title: 'Pretrazivanje',
    caption: 'Pretrazivanje Knjiga',
    icon: 'school',
    link: '#/pretrazivanjeknjiga',
  },
  {
    title: 'Lokacija',
    caption: 'Lokacija',
    icon: 'location',
    link: '#/lokacijapage',
  },
  {
    title: 'Login',
    caption: 'Login Page',
    icon: 'school',
    link: '#/loginpage',
  },
  {
    title: 'Registracija',
    caption: 'Registration Page',
    icon: 'school',
    link: '#/registracijapage',
  },
  {
    title: 'Test',
    caption: 'Test Page',
    icon: 'school',
    link: '#/testpage',
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
