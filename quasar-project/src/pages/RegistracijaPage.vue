<template>
  <div class="q-pa-md q-gutter-md" style="max-width: 400px; margin: auto;">
    <div class="text-h6">Registracija</div>
    <q-input v-model="korisnik.ime" label="Ime" outlined />
    <q-input v-model="korisnik.prezime" label="Prezime" outlined />
    <q-input v-model="korisnik.email" label="Email" type="email" outlined />
    <q-input v-model="korisnik.korisnicko_ime" label="Korisničko ime" outlined />
    <q-input v-model="korisnik.lozinka" label="Lozinka" type="password" outlined />
    <q-btn color="primary" label="Potvrdi" @click="register" />

    <div v-if="error" class="text-negative q-mt-sm">{{ error }}</div>
    <div v-if="success" class="text-positive q-mt-sm">{{ success }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const korisnik = ref({
  ime: '',
  prezime: '',
  email: '',
  korisnicko_ime: '',
  lozinka: ''
})

const error = ref('')
const success = ref('')

const register = async () => {
  error.value = ''
  success.value = ''

  if (!korisnik.value.ime || !korisnik.value.prezime || !korisnik.value.email || !korisnik.value.korisnicko_ime || !korisnik.value.lozinka) {
    error.value = 'Sva polja su obavezna!'
    return
  }

  try {
    console.log('Registracija poslana:', korisnik.value)

    const res = await axios.post('http://localhost:3000/registracija', korisnik.value)
    success.value = res.data.message

    korisnik.value = { ime: '', prezime: '', email: '', korisnicko_ime: '', lozinka: '' }
  } catch (err) {
    console.log('MYSQL ERROR:', err);
    error.value = err.response?.data?.message || 'Greška pri registraciji'
  }
}
</script>