<template>
  <div class="q-pa-md q-gutter-md" style="max-width: 400px; margin: auto;">
    <div class="text-h6">Prijava</div>
    <q-input v-model="loginData.username" label="Korisničko ime" outlined />
    <q-input v-model="loginData.password" label="Lozinka" type="password" outlined />
    <q-btn color="primary" label="Potvrdi" @click="login" />
    <div v-if="error" class="text-negative q-mt-sm">{{ error }}</div>
    <div v-if="success" class="text-positive q-mt-sm">{{ success }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const loginData = ref({ username: '', password: '' })
const error = ref('')
const success = ref('')

const login = async () => {
  error.value = ''
  success.value = ''
  try {
    const res = await axios.post('http://localhost:3000/login', loginData.value)
    success.value = res.data.message
    console.log('Prijavljen korisnik:', res.data.user)
  } catch (err) {
    error.value = err.response?.data?.message || 'Greška pri prijavi'
  }
}
</script>