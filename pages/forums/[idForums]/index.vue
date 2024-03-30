<script>
import Header from '~/components/Header.vue'
import {toArray} from "#app/utils.js";
import {th} from "vuetify/locale";
export default {
  components: {
    Header
  },
  data() {
    return {
      sujets: null,
      id: this.$route.params.idForums,
      page: 1,
      pageMax: null
    };
  },
  methods: {
    async getSujets() {
      try {
        this.sujets = await $fetch(`/api/forums/${this.id}/sujets?page=${this.page}`);
        this.pageMax = this.sujets.pageMax
        console.log(this.pageMax)
        this.sujets = this.sujets.data
        console.log(this.sujets)
      } catch (error) {
        console.error('Erreur lors de la récupération des forums :', error);
      }
    },
  },
  async mounted() {
    await this.getSujets()
  },

}

</script>

<template>
  <Header />
  <v-container>

    <v-row>
      <v-col class="justify-center">
        <v-card class="mx-auto my-2"
                max-width="1000">
          <v-card-title>
            <h1 class="text-center mb-8">Forums</h1>
          </v-card-title>
          <v-card-text v-if="sujets">
            <v-list class="text-center">

                <v-list-item v-for="sujet in sujets" :key="sujet.id" class="mb-4">
                  <nuxt-link :to="`/forums/${sujet.forum_id}/sujets/${sujet.id}`" class="text-decoration-none text-h6">
                  <v-list-item-title>{{ sujet.title }}</v-list-item-title>
                  <v-list-item-subtitle>Auteur : {{ sujet.login }}</v-list-item-subtitle>
                    <v-list-item-title>Date de parution : ({{ sujet.date }})</v-list-item-title>
                    <v-list-item-title>Dernier message de : </v-list-item-title>
                  </nuxt-link>
                </v-list-item>

            </v-list>
          </v-card-text>
            <v-card-text v-else>
              <p class="text-center">Aucun sujet</p>
            </v-card-text>
          <v-btn @click="createSujet" color="secondary">Créer un sujet</v-btn>
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