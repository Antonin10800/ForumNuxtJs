<script>
export default {
    data() {
    return {
      login: '',
    };
  },
  async mounted(){
    const {session, refresh} = await useSession();
    await refresh();
    this.login = session.value.login;
  },
  methods: {
    async updateLogin(newVal){
      console.log(newVal)
      const {update} = await useSession();
      await update({login: newVal});
      this.login = newVal
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
