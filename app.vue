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
    console.log(session.value.admin)
    if (session.value.login) this.login = session.value.login;
    if (session.value.idUser) this.idUser = session.value.idUser;
    if (session.value.admin) this.admin = session.value.isAdmin;
  },
  methods: {
    async updateLogin(newVal){
      const {update} = await useSession();
      this.login = newVal
      await update({login: newVal});
      if (newVal !== '') {
        $fetch(`/api/users/${this.login}`, {
          method: 'GET',
        }).then(async (response) => {
          console.log("response", response)
          this.idUser = response.id;
          this.admin = response.admin;
          console.log("updatelogin", this.idUser, this.admin)
          await update({idUser: this.idUser, admin: this.admin});
        }).catch((error) => {
          if (error.response._data.error !== undefined)
            this.$error(error.response._data.error)
          else
            this.$error(error.response._data.message)
        })
      } else {
        this.idUser = '';
        this.admin = false;
        await update({idUser: this.idUser, admin: this.admin});
      }
    }
  },
}

</script>

<template>
  <NuxtLayout>
    <v-app>
        <Header :login="login" :isAdmin="admin" @login="updateLogin" @logout="updateLogin" class="header"/>
      <NuxtPage />
    </v-app>
  </NuxtLayout>
</template>

<style>
.header{
  position: inherit !important;
}

</style>
