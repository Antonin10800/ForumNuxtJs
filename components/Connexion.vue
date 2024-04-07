<script>


export default {
  props: {
    display: Boolean,
  },
  data() {
    return {
      visible: false,
      valid: false,
      login: '',
      password: '',
      rules: {
        required: (value) => !!value || 'Champ requis.',
      },
    }
  },
  watch: {
    display(newVal) {
      this.visible = newVal;
    },
    visible(newVal) {
      this.$emit('update:connexion', newVal);
    }
  },
  methods: {
    submit() {
      if (this.valid) {
        $fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            login: this.login,
            password: this.password,
          },
        }).then(async (response) => {
          if (response.connected) {
            this.$success('Connexion réussie')
            this.$emit('update:connexion', false);
            this.$emit('login', this.login)
          }
        }).catch((error) => {
          if (error.response._data.error !== undefined)
            this.$error(error.response._data.error)
          else
            this.$error(error.response._data.message)
        })
      }
    },
  },
}
</script>

<template>
  <v-dialog v-model="visible">
    <v-card>
      <v-card-title>Connexion</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
              label="Identifiant"
              v-model="login"
              :rules="[rules.required]"
              required
              @keyup.enter="submit"
              autofocus
          ></v-text-field>
          <v-text-field
              label="Mot de passe"
              v-model="password"
              :rules="[rules.required]"
              type="password"
              required
              @keyup.enter="submit"
          ></v-text-field>
          <v-btn @click="submit">Se connecter</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
