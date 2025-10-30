<template>
  <div class="q-pa-md q-gutter-md" style="max-width: 400px; margin: auto;">
    <div class="text-h6">Registracija</div>
    <q-input v-model="korisnik.ime" label="Ime" outlined />
    <q-input v-model="korisnik.prezime" label="Prezime" outlined />
    <q-input v-model="korisnik.email" label="Email" type="email" outlined />
    <q-input v-model="korisnik.korisnicko_ime" label="Korisničko ime" outlined />
    <q-input v-model="korisnik.lozinka" label="Lozinka" type="password" outlined />
    <q-btn color="primary" label="Potvrdi" @click="register" />
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const korisnik = ref({
      ime: '',
      prezime: '',
      email: '',
      korisnicko_ime: '',
      lozinka: ''
    })

    const register = () => {
      console.log('Registracija poslana:', korisnik.value)
      // TODO: ovdje bi išao poziv prema backendu (API)
    }

    return { korisnik, register }
  }
}
</script>
