<script>
export default {
  props: {
    display: Boolean,
  },
  data() {
    return {
      visible: false,
      valid: false,
      lastPassword: '',
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
      this.$emit('update:account', newVal);
    }
  },
  methods: {
    async submit() {
      const {session} = await useSession()
      if (this.valid) {
        $fetch(`/api/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            login: session.value.login,
            lastPassword: this.lastPassword,
            password: this.password,
          },
        }).then(async (response) => {
          if (response.passwordEdit) {
            this.lastPassword = ''
            this.password = ''
            this.$success('Mot de passe changé')
            this.$emit('update:account', false);
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
      <v-card-title>Changer son mot de passe</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
              label="Ancien mot de passe"
              v-model="lastPassword"
              :rules="[rules.required]"
              type="password"
              required
              @keyup.enter="submit"
              autofocus
          ></v-text-field>
          <v-text-field
              label="Nouveau mot de passe"
              v-model="password"
              :rules="[rules.required]"
              type="password"
              required
              @keyup.enter="submit"
          ></v-text-field>
          <v-btn @click="submit">Changer</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>