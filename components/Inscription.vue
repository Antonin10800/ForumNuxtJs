<script >
export default {
  props: {
    display: Boolean,
    isAdmin: Boolean,
  },
  data() {
    return {
      username: '',
      password: '',
      admin: false,
      visible: false,
      valid: false,
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
      this.$emit('update:inscription', newVal);
    }
  },
  methods: {
    submit() {
      if (this.valid) {
        $fetch('/api/users', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            login: this.username,
            password: this.password,
            admin: this.admin,
          },
        }).then(async (response) => {
          if (response.userCreated) {
            this.$success('Inscription réussie')
            this.$emit('login', this.username)
            this.$emit('update:inscription', false);
          }
        }).catch((error) => {
          if (error.response._data.error !== undefined)
            this.$error(error.response._data.error)
          else
            this.$error(error.response._data.message)
        })
      }},
  },
}
</script>

<template>
  <v-dialog v-model="visible">
    <v-card>
      <v-card-title v-if="isAdmin">Inscire un utilisateur</v-card-title>
      <v-card-title v-else>S'inscire</v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
              label="Identifiant"
              v-model="username"
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
          <v-checkbox v-if="isAdmin"
              v-model="admin"
              label="Administrateur"
          ></v-checkbox>
          <v-btn @click="submit">S'inscrire</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
