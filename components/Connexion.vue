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
            this.$emit('update:connexion', false);
            this.$emit('login', this.login)
          } else {
            console.log(response.data().error)
          }
        }).catch((error) => {
          console.error(error.response._data.error)
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
  </v-dialog>
</template>

<style scoped>

</style>