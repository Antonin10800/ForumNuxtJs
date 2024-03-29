<script>


export default {
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
    async submit() {
      if (this.valid) {
        const response = await $fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        })
        console.log(response)
      }
    }
  }
}

</script>

<template>
  <v-card>
    <v-card-title>Connexion</v-card-title>
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
        <v-btn @click="submit">Se connecter</v-btn>
      </v-form>
    </v-card-text>
  </v-card>

</template>

<style scoped>

</style>