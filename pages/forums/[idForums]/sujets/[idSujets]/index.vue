<script>
import Header from '~/components/Header.vue'
import {toArray} from "#app/utils.js";
export default {
  components: {
    Header
  },
  data() {
    return {
      messages: null,
      id: this.$route.params.idSujets,
      page: 1,
      pageMax: null
    };
  },
  methods: {
    async getSujets() {
      try {
        this.messages = await $fetch(`/api/sujets/${this.id}/messages?page=${this.page}`);
        this.pageMax = this.messages.pageMax
        console.log(this.pageMax)
        this.messages = this.messages.data
        console.log(this.messages)
      } catch (error) {
          if (error.response._data.error !== undefined)
            this.$error(error.response._data.error)
          else
            this.$error(error.response._data.message)

      }
    },
  },
  async mounted() {
    await this.getSujets()
  },
}

</script>

<template>
  <div v-if="messages">
    <v-card
        class="mx-auto"
        max-width="800"
    >
      <v-toolbar
          color="secondary"
          dark
      >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Messages</v-toolbar-title>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list>
        <v-list-item-group>
          <v-list-item v-for="message in messages" :key="message.id">
            <v-list-item-auteur>
              {{message.login}}
            </v-list-item-auteur>
            <v-list-item-content>
              <v-list-item-title>{{message.content}}</v-list-item-title>
              <v-list-item-subtitle>{{message.date}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-pagination
          v-model=page
          :length="pageMax"
          @click="getSujets"/>
    </v-card>
  </div>
</template>


<style scoped>
.v-card{
  margin-top: 80px;
}
</style>