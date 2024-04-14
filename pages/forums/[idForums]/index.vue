<script>
import Header from '~/components/Header.vue'
import {toArray} from "#app/utils.js";
import {th} from "vuetify/locale";
// import creationSujet from "~/components/CreationSujet.vue";
export default {
  components: {
    Header,
    // CreationSujet
  },
  data() {
    return {
      sujets: null,
      id: this.$route.params.idForums,
      page: 1,
      pageMax: null,
      showCreateSujet: false,
      message:'',
      titreCreateSujet:'',
      displayCreateSujet: false,
    };
  },

  methods: {
    async submit(){
      const {session, refresh} = await useSession();
      await refresh();
      const body = {
        title: this.titreCreateSujet,
        author: session.value.idUser,
        forum: this.id,
        message: this.message
      };
      $fetch('/api/sujets', {
        method:'PUT',
        headers:{
          "Content-Type": "application/json",
        },
        body: body
      }).then((response) => {
        console.log(response)
      }).catch((error) => {
        if (error.response._data.error !== undefined)
          this.$error(error.response._data.error)
        else
          this.$error(error.response._data.message)
      })

      this.showCreateSujet = false
      await this.getSujets()
    },
    createSujet() {
      this.message =''
      this.titreCreateSujet=''
      this.showCreateSujet = !this.showCreateSujet
    },

    async getSujets() {
      $fetch(`/api/forums/${this.id}/sujets?page=${this.page}`)
        .then((response) => {
          if (response !== undefined){
            this.pageMax = response.pageMax
            this.sujets = response.data
          }
        }).catch((error) => {
          if (error.response._data.error !== undefined)
            this.$error(error.response._data.error)
          else
            this.$error(error.response._data.message)
        })
    },
  },
  computed: {
    formattedDate() {
      return (date) => {
        if (!date) return ''
        let d = new Date(date)
        let day = ("0" + d.getUTCDate()).slice(-2)
        let month = ("0" + (d.getUTCMonth() + 1)).slice(-2)
        let year = d.getUTCFullYear()
        let hours = ("0" + d.getUTCHours()).slice(-2)
        let minutes = ("0" + d.getUTCMinutes()).slice(-2)
        return `${hours}:${minutes} ${day}/${month}/${year}`
      }
    },

  },
  async mounted() {
    const {session} = await useSession()
    if (session.value && session.value.login !== '' && session.value.login !== undefined){
      this.displayCreateSujet = true
    }
    document.addEventListener('connected', async (event) => {
      const {session} = await useSession();
      if (session.value && session.value.login !== '' && session.value.login !== undefined){
        this.displayCreateSujet = true
      }
    })
    document.addEventListener('disconnected', async () => {
      this.displayCreateSujet = false
    })
    await this.getSujets()
  },

}

</script>

<template>

  <v-container>

    <v-card v-if="showCreateSujet">
      <v-card-title>
        <h1 class="text-center mb-8">Création d'un sujet</h1>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
              label="Titre"
              v-model="titreCreateSujet"
          ></v-text-field>
          <v-textarea
              label="Message"
              v-model="message"
          ></v-textarea>
          <v-btn @click="submit">Créer</v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <v-row>
      <v-col class="justify-center">
        <v-card class="mx-auto my-2"
                max-width="1000">
          <v-btn v-if="displayCreateSujet" @click="createSujet" color="secondary">Créer un sujet</v-btn>
          <v-card-title>
            <h1 class="text-center mb-8">Forums</h1>
          </v-card-title>
          <v-card-text v-if="sujets">
            <v-list class="text-center">

                <v-list-item v-for="sujet in sujets" :key="sujet.id" class="mb-4">
                  <nuxt-link :to="`/forums/${sujet.forum_id}/sujets/${sujet.id}`" class="text-decoration-none text-h6">
                  <v-list-item-title>{{ sujet.title }}</v-list-item-title>
                  <v-list-item-subtitle>Auteur : {{ sujet.login }}</v-list-item-subtitle>
                    <v-list-item-title>Date de parution : {{ formattedDate(sujet.date) }}</v-list-item-title>
                    <v-list-item-title>Dernier message de : {{ sujet.last_message_author }}</v-list-item-title>
                  </nuxt-link>
                </v-list-item>

            </v-list>
          </v-card-text>
            <v-card-text v-else>
              <p class="text-center">Aucun sujet</p>
            </v-card-text>
          <v-pagination
              v-model=page
              :length="pageMax"
              @click="getSujets"/>
        </v-card>
      </v-col>
    </v-row>

  </v-container>

</template>

<style scoped>

</style>