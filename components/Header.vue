<script>
import Inscription from '@/components/Inscription.vue'
import Connexion from '@/components/Connexion.vue'
export default {
  props: {
    login: String,
    isAdmin: Boolean,
  },
  data() {
    return {
      DisplayInscription: false,
      DisplayConnexion: false,
      DisplayAccount: false,
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
    account() {
      this.DisplayAccount = true
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
    updateDisplayAccount(value) {
      this.DisplayAccount = value;
    },
  },
}
</script>


<template>
  <v-app-bar color="secondary">
    <v-btn @click="$router.go(-1)">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-app-bar-title>
      <v-btn @click="Home">NuxtForum</v-btn>
    </v-app-bar-title>

    <v-spacer />
    <v-btn v-if="login === '' || login === undefined || isAdmin" @click="Inscription">Inscription
      <v-icon>mdi mdi-login-variant</v-icon>
      <Inscription
          :display="DisplayInscription"
          :isAdmin="isAdmin"
          @update:inscription="updateDisplayInscription"
          @login="emitLogin"
      />
    </v-btn>

    <v-btn v-if="login === '' || login === undefined" @click="Connexion">Connexion
      <v-icon>mdi mdi-login</v-icon>
      <Connexion
          :display="DisplayConnexion"
          @update:connexion="updateDisplayConnexion"
          @login="emitLogin"
      />
    </v-btn>

    <div v-else>

      <v-btn @click="Deconnexion">Déconnexion
        <v-icon>mdi mdi-logout</v-icon>
      </v-btn>

      <v-btn @click="account">Mon compte
        <v-icon>mdi mdi-account</v-icon>
        <Compte
            :display="DisplayAccount"
            @update:account="updateDisplayAccount"
        />
      </v-btn>
    </div>




  </v-app-bar>


</template>

<style scoped>

</style>