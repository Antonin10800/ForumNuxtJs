<script>
import Header from '~/components/Header.vue'
import { toArray } from "#app/utils.js";

export default {
  components: {
    Header
  },
  data() {
    return {
      messages: null,
      id: this.$route.params.idSujets,
      page: 1,
      pageMax: null,
      newMessageContent: '',
      showCreateMessage: false,
      displayCreateMessage : false,
    };
  },
  methods: {
    async getSujets() {
      try {
        this.messages = await $fetch(`/api/sujets/${this.id}/messages?page=${this.page}`);
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
        const response = await $fetch(`/api/sujets/${this.id}/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            content: this.newMessageContent,
            author_id: session.value.idUser,
            sujet_id: this.id,
          })
        });
        await this.getSujets();
        this.newMessageContent = '';
        this.showCreateMessage = false;
      } catch (error) {
        if (error.response._data.error !== undefined)
          this.$error(error.response._data.error);
        else
          this.$error(error.response._data.message);
      }
    }
  },
  async mounted() {
    const {session} = await useSession()
    if (session.value && session.value.login !== '' && session.value.login !== undefined){
      this.displayCreateMessage = true
    }
    document.addEventListener('connected', async (event) => {
      const {session} = await useSession();
      if (session.value && session.value.login !== '' && session.value.login !== undefined){
        this.displayCreateMessage = true
      }
    })
    document.addEventListener('disconnected', async () => {
      this.displayCreateMessage = false
    })
    await this.getSujets();
  },
}
</script>

<template>
  <div>
    <v-btn  v-if="displayCreateMessage" @click="showCreateMessage = !showCreateMessage">
      {{ showCreateMessage ? 'Annuler' : 'Nouveau Message' }}
    </v-btn>
    <v-card v-if="showCreateMessage">
      <v-card-title>Nouveau Message</v-card-title>
      <v-card-text>
        <v-textarea v-model="newMessageContent" label="Contenu du Message" />
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="createMessage">Envoyer</v-btn>
      </v-card-actions>
    </v-card>

    <div v-if="messages">
      <v-card class="mx-auto" max-width="800">
        <v-toolbar color="secondary" dark>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
          <v-toolbar-title>Messages</v-toolbar-title>
          <v-btn icon><v-icon>mdi-magnify</v-icon></v-btn>
        </v-toolbar>
        <v-list>
          <v-list-item v-for="message in messages" :key="message.id">
            <v-list-item>
              {{message.login}}
            </v-list-item>
            <v-list-item>
              <v-list-item-title>{{message.content}}</v-list-item-title>
              <v-list-item-subtitle>{{message.date}}</v-list-item-subtitle>
            </v-list-item>
          </v-list-item>
        </v-list>
        <v-pagination v-model=page :length="pageMax" @click="getSujets"/>
      </v-card>
    </div>
  </div>
</template>

<style scoped>
.v-card {
  margin-top: 80px;
}
</style>
