<script>
export default {

  beforeRouteEnter(to, from, next) {
    next(vm => {
      //le username est stocké dans la session
      vm.username = sessionStorage.getItem('isLogged')
    })
  },
  data() {
    return {
      valid: false,
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
        //todo: call api
        console.log('Modification validée')
      }
    }
  }
}

</script>

<template>
  <v-card>
    <v-card-title>Modification de son profil</v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field
            label="Identifiant"
            model-value="username"
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
        <v-btn @click="submit">Modifier</v-btn>
      </v-form>
    </v-card-text>
  </v-card>

</template>

<style scoped>

</style>