<script>
import Inscription from '@/components/Inscription.vue'
import Connexion from '@/components/Connexion.vue'

export default {
  components: {
    Inscription,
    Connexion
  },
  methods: {
    Inscription() {
      console.log('Inscription')
    },
    Connexion() {
      console.log('Connexion')
    },

  }
}
</script>

<template>

  <v-btn @click="Inscription">Inscription</v-btn>
  <v-btn @click="Connexion">Connexion</v-btn>
  <Connexion></Connexion>

</template>

<style scoped>

</style>