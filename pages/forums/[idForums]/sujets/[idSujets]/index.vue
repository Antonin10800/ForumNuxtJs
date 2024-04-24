<script>
import Header from '~/components/Header.vue';

export default {
  components: {
    Header
  },
  data() {
    return {
      messages: null,
      idSujet: this.$route.params.idSujets,
      page: 1,
      pageMax: null,
      newMessageContent: '',
      showCreateMessage: false,
      displayCreateMessage : false,
      loginUser:undefined,
      isAdmin: false,
      isEditMessage: false,
      idMessageEditing: undefined,
    };
  },
  methods: {
    async getMessages() {
      try {
        this.messages = await $fetch(`/api/sujets/${this.idSujet}/messages?page=${this.page}`);
        this.pageMax = this.messages.pageMax;
        this.messages = this.messages.data;
      } catch (error) {
        if (error.response._data.error !== undefined)
          this.$error(error.response._data.error);
        else
          this.$error(error.response._data.message);
      }
    },
    async createMessage() {
      try {
        const {session, refresh} = await useSession();
        await refresh();
        $fetch(`/api/sujets/${this.id}/messages`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            content: this.newMessageContent,
            author_id: session.value.idUser,
            sujet_id: this.id,
          })
        }).then(async (response) => {
          this.$success(response.success);
          let event = new Event('newer');
          document.dispatchEvent(event);
          await this.getMessages()
        })

        await this.getMessages();
        this.newMessageContent = '';
        this.showCreateMessage = false;
      } catch (error) {
        if (error.response._data.error !== undefined)
          this.$error(error.response._data.error);
        else
          this.$error(error.response._data.message);
      }
    },
    async editMessage(id) {
      this.idMessageEditing = id;
      if (this.isEditMessage){
        $fetch(`/api/sujets/${this.idSujet}/messages/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: {
            content: this.messages.find(message => message.id === id).content,
          }
        }).then(async (response) => {
          this.$success(response.message);
          // let event = new Event('newer');
          // document.dispatchEvent(event);
          // await this.getMessages()
        }).catch((error) => {
          if (error.response._data.error !== undefined)
            this.$error(error.response._data.error);
          else
            this.$error(error.response._data.message);
        })
      }
      this.isEditMessage = !this.isEditMessage;

    },
    deleteMessage(id){
      if (confirm('Êtes-vous sûr de vouloir supprimer ce message ?')){
        $fetch(`/api/sujets/${this.idSujet}/messages/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(async (response) => {
          this.$success(response.message);
          let event = new Event('newer');
          document.dispatchEvent(event);
          await this.getMessages()
        }).catch((error) => {
          if (error.response._data.error !== undefined)
            this.$error(error.response._data.error);
          else
            this.$error(error.response._data.message);
        })
      }
    },
  },
  async mounted() {
    const {session} = await useSession()
    if (session.value && session.value.login !== '' && session.value.login !== undefined){
      this.displayCreateMessage = true
      this.loginUser = session.value.login;
    }
    document.addEventListener('connected', async () => {
      const {session} = await useSession();
      if (session.value && session.value.login !== '' && session.value.login !== undefined){
        if(session.value.admin)
          this.isAdmin = true

        this.displayCreateMessage = true
        this.loginUser = session.value.login;
      }
    })
    document.addEventListener('disconnected', async () => {
      this.displayCreateMessage = false
      this.loginUser = undefined;
      this.isAdmin = false
    })
    document.addEventListener('refresh', async () =>{
      await this.getMessages();
    })
    await this.getMessages();
  },
}
</script>

<template>
  <div>

    <v-card v-if="showCreateMessage" class="mx-auto" max-width="800">
      <v-card-title>Nouveau Message</v-card-title>
      <v-card-text>
        <v-textarea v-model="newMessageContent" label="Contenu du Message" />
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="createMessage">Envoyer</v-btn>
      </v-card-actions>
    </v-card>

    <div v-if="messages" class="ma-5">

      <v-card class="mx-auto" max-width="800">

        <v-toolbar color="secondary" dark>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
          <v-toolbar-title>Messages</v-toolbar-title>
          <v-btn  v-if="displayCreateMessage" @click="showCreateMessage = !showCreateMessage">
            {{ showCreateMessage ? 'Annuler' : 'Nouveau Message' }}
          </v-btn>
        </v-toolbar>
        <v-list>
          <v-list-item v-for="message in messages" :key="message.id">
            <v-list-item>
              <strong>{{message.login}}</strong>
            </v-list-item>
            <v-list-item>
              <v-textarea v-if="isEditMessage && message.id === idMessageEditing" v-model="message.content" label="Contenu du Message" />
              <v-list-item-title v-else>{{message.content}}</v-list-item-title>
              <v-list-item-subtitle>{{message.date}}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item v-if="loginUser === message.login || isAdmin" class="d-flex flex-row-reverse">
              <v-btn v-if="!isEditMessage" @click="editMessage(message.id)" class="edit ma-1" icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn v-else  @click="editMessage(message.id)" class="edit ma-1" color="secondary" icon>
                <v-icon>mdi-check</v-icon>
              </v-btn>
              <v-btn @click="deleteMessage(message.id)" class="delete ma-1" color="error" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item>
          </v-list-item>
        </v-list>
        <v-pagination v-model=page :length="pageMax" @click="getMessages"/>
      </v-card>
    </div>
  </div>
</template>

<style scoped>

</style>
