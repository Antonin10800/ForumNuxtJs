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
      id: this.$route.params.id,
      page: 1,
    };
  },
  async mounted() {
    try {
      this.sujets = await $fetch(`/api/forums/${this.id}/sujets?page=${this.page}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(this.sujets.data)
    } catch (error) {
      console.error('Erreur lors de la récupération des forums :', error);
    }
  },
}

</script>

<template>
  <v-container>
    <Header />
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <h1>Forums</h1>
          </v-card-title>
          <v-card-text>
            <v-list>

                <v-list-item v-for="sujet in sujets.data" :key="sujet.id">
                  <v-list-item-title>{{ sujet.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{ sujet.login }}</v-list-item-subtitle>

                </v-list-item>

            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <div v-if="sujets"></div>

</template>

<style scoped>

</style>