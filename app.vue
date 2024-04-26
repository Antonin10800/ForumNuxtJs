<script setup>
let ws
const connect = async () =>{
  const isSecure = location.protocol === "https:";
  const url = (isSecure ? "wss://" : "ws://") + location.host + "/_ws";
  if (ws) {
    ws.close();
  }
  ws = new WebSocket(url);
  ws.addEventListener("message", (event) => {
    const message = event.data
    if (message.includes('refresh')){
      let event = new Event('refresh')
      document.dispatchEvent(event)
    }
  });
  await new Promise((resolve) => ws.addEventListener("open", resolve));
  document.addEventListener('newer', async () => {
    ws.send('newer')
  })
};

onMounted(connect);
</script>

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
    if (session.value.login) {
      this.login = session.value.login;
      let event = new Event('connected')
      document.dispatchEvent(event)
    }
    if (session.value.idUser) this.idUser = session.value.idUser;
    if (session.value.admin) this.admin = session.value.isAdmin;


  },
  methods: {
    async updateLogin(newVal){
      let typeEvent = ''
      const {update, refresh} = await useSession();
      this.login = newVal
      await update({login: newVal});
      if (newVal !== '') {
        try {
          const response = await $fetch(`/api/users/${this.login}`, {
            method: 'GET',
          });
          typeEvent = 'connected';
          this.idUser = response.id;
          this.admin = response.admin === 1;
        } catch (error) {
          typeEvent = 'disconnected';
          this.idUser = '';
          this.admin = false;
          if (error.response._data.error !== undefined)
            this.$error(error.response._data.error);
          else
            this.$error(error.response._data.message);
        }
      } else {
        typeEvent = 'disconnected'
        this.idUser = '';
        this.admin = false;
      }
      await update({idUser: this.idUser, admin: this.admin});
      await refresh()
      let event = new Event(typeEvent)
      document.dispatchEvent(event)
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
