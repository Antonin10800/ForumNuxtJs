<template>
  <Header></Header>
  <v-container>
    <v-row>
      <v-col class="justify-center">
        <h1 class="text-center mb-8">ForumNuxt</h1>
        <v-list class="text-center">
          <v-list-item
              v-for="forum in forums"
              :key="forum.id"
              class="mb-4"
          >
            <nuxt-link :to="`/forums/${forum.id}`" class="text-decoration-none text-h6">
              <v-card
                  subtitle="This is a subtitle"
                  :title ="forum.title"
                  width="400"
              ></v-card>
            </nuxt-link>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
  components: {
    Header
  },
  data() {
    return {
      forums: []
    };
  },
  async mounted() {
    try {
      this.forums = await $fetch('api/forums');
      console.log(this.forums)
    } catch (error) {
      console.error('Erreur lors de la récupération des forums :', error);
    }
  },
};
</script>

<style>
.text-h6 {
  color: #3F51B5;
}
</style>