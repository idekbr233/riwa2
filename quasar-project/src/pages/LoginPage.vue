<template>
  <div class="q-pa-md q-gutter-md" style="max-width: 400px; margin: auto;">
    <div class="text-h6">Prijava</div>
    <q-input v-model="loginData.username" label="Korisničko ime" outlined />
    <q-input v-model="loginData.password" label="Lozinka" type="password" outlined />
    <q-btn color="primary" label="Potvrdi" @click="login" />
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const loginData = ref({ username: '', password: '' })

    const login = () => {
      console.log('Login pokušaj:', loginData.value)
      // TODO: ovdje ide API poziv kada baza bude spremna
    }

    return { loginData, login }
  }
}
</script>
