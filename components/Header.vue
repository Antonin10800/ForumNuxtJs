<script>
import Inscription from '@/components/Inscription.vue'
import Connexion from '@/components/Connexion.vue'

export default {
  data() {
    return {
      DisplayInscription: false,
      DisplayConnexion: false,
    }
  },
  components: {
    Inscription,
    Connexion,
  },
  methods: {
    Inscription() {
      this.DisplayInscription = true
    },
    Connexion() {
      this.DisplayConnexion = true
    },
    Deconnexion() {
      console.log('Deconnexion')
    },
    Home() {
      this.$router.push('/');
    },
    updateDisplayConnexion(value) {
      this.DisplayConnexion = value;
    },
    updateDisplayInscription(value) {
      this.DisplayInscription = value;
    },
  }
}
</script>


<template>
  <v-app-bar color="secondary">

    <v-app-bar-title>
      <v-btn @click="Home">NuxtForum</v-btn>
    </v-app-bar-title>


    <v-spacer />
    <v-btn @click="Connexion">Connexion
      <v-icon>mdi mdi-login</v-icon>
    </v-btn>

    <v-btn @click="Deconnexion">Deconnexion
      <v-icon>mdi mdi-logout</v-icon>
    </v-btn>

    <v-btn @click="Inscription">Inscription
      <v-icon>mdi mdi-login-variant</v-icon>
    </v-btn>

    <Connexion :display="DisplayConnexion" @update:connexion="updateDisplayConnexion"/>
    <Inscription :display="DisplayInscription" @update:inscription="updateDisplayInscription"/>

  </v-app-bar>


</template>

<style scoped>

</style>