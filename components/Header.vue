<script>
import Inscription from '@/components/Inscription.vue'
import Connexion from '@/components/Connexion.vue'

export default {
  components: {
    Inscription,
    Connexion,
  },
  methods: {
    Inscription() {
      console.log('Inscription')
    },
    Connexion() {
      console.log('Connexion')
    },
    Deconnexion() {
      console.log('Deconnexion')
    },
  }
}
</script>

<template>
  <v-app-bar color="secondary">

    <v-app-bar-title>NuxtForum</v-app-bar-title>

    <v-spacer></v-spacer>
    <v-btn @click="Connexion">Connexion
      <v-icon>mdi mdi-login</v-icon>
    </v-btn>

    <v-btn @click="Deconnexion">Deconnexion
      <v-icon>mdi mdi-logout</v-icon>
    </v-btn>

    <v-btn @click="Inscription">Inscription
      <v-icon>mdi mdi-login-variant</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<style scoped>

</style>