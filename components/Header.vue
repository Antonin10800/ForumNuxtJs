<script>
import Inscription from '@/components/Inscription.vue'
import Connexion from '@/components/Connexion.vue'
export default {
  props: {
    login: String,
  },
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
    async Deconnexion() {
      this.$emit('logout', '')
    },
    emitLogin(login){
      this.$emit('login', login)
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
  },

}
</script>


<template>
  <v-app-bar color="secondary">

    <v-app-bar-title>
      <v-btn @click="Home">NuxtForum</v-btn>
    </v-app-bar-title>

    <v-spacer />
    <div v-if="login === '' || login === undefined">
      <v-btn @click="Connexion">Connexion
        <v-icon>mdi mdi-login</v-icon>
        <Connexion
            :display="DisplayConnexion"
            @update:connexion="updateDisplayConnexion"
            @login="emitLogin"
        />
      </v-btn>

      <v-btn @click="Inscription">Inscription
        <v-icon>mdi mdi-login-variant</v-icon>
        <Inscription
            :display="DisplayInscription"
            @update:inscription="updateDisplayInscription"
            @login="emitLogin"
        />
      </v-btn>
    </div>

    <v-btn v-else @click="Deconnexion">Deconnexion
      <v-icon>mdi mdi-logout</v-icon>
    </v-btn>



  </v-app-bar>


</template>

<style scoped>

</style>