<template>
  <v-dialog v-model="visible">
    <v-card>
      <v-card-title>S'inscire</v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
              label="Identifiant"
              v-model="username"
              :rules="[rules.required]"
              required
          ></v-text-field>
          <v-text-field
              label="Mot de passe"
              v-model="password"
              :rules="[rules.required]"
              type="password"
              required
          ></v-text-field>
          <v-btn @click="submit">S'inscrire</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script >

export default {

  data() {
    return {
      visible: true,
      valid: false,
      /**
       * Si isLogged est remplit, l'utilisateur viens pour modifier son profil
       * Si isLogged est vide, l'utilisateur viens pour s'inscrire
       */
      isLogged: '',
      username: '',
      password: '',
      rules: {
        required: (value) => !!value || 'Champ requis.',
      },
    }
  },

  methods: {
    submit() {
      if (this.valid) {
        this.$emit('inscriptionvalidated');
        this.visible = false
        console.log('Inscription validée')
        //todo: call api
      }},


  },


}

</script>

<style scoped>

</style>