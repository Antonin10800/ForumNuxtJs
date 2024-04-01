<script >
export default {
  props: {
    display: Boolean,
  },
  data() {
    return {
      username: 'user2',
      password: 'password',
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
          method: 'POST',
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
            this.$emit('login', this.username)
            this.$emit('update:inscription', false);
          } else {
            console.error('response : ', response.data().error)
          }
        }).catch(async (error) => {
          console.error('error : ', error.response._data.error)
        })
        this.$emit('update:inscription', false);
      }},
  },
}
</script>

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
          <v-checkbox v-if="false"
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