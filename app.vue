<script>
export default {
    data() {
    return {
      login: '',
      idUser: undefined,
      admin: false,
    };
  },
  async mounted(){
    const {session, refresh} = await useSession();
    await refresh();
    if (session.value.login) this.login = session.value.login;
    if (session.value.idUser) this.idUser = session.value.idUser;
    if (session.value.admin) this.admin = session.value.admin;
  },
  methods: {
    async updateLogin(newVal){
      const {update} = await useSession();
      this.login = newVal
      await update({login: newVal});
      $fetch(`/api/users/${this.login}`, {
        method: 'GET',
      }).then(async (response) => {
        this.idUser = response.idUser;
        this.admin = response.admin;
        await update({idUser: this.idUser, admin: this.admin});
      }).catch((error) => {
        console.error(error.response._data.error)
      })

      await update({login: newVal});

    }
  },
}

</script>

<template>
  <NuxtLayout>
    <v-app>
        <Header :login="login" @login="updateLogin" @logout="updateLogin" class="header"/>
      <NuxtPage />
    </v-app>
  </NuxtLayout>
</template>

<style>
.header{
  position: inherit !important;
}

</style>
