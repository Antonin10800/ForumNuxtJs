<template>
  <v-container>
    <v-row>
      <v-col class="justify-center">
        <h1 class="text-center mb-8">ForumNuxt</h1>
        <p>{{session.value}}</p>
        <v-list class="text-center">
          <v-list-item
              v-for="forum in forums"
              :key="forum.id"
              class="mb-4"
          >
            <nuxt-link :to="`/forums/${forum.id}`" class="text-decoration-none text-h6">
              <v-card
                  class="mx-auto my-2"
                  max-width="1000"
                  :subtitle="forum.nbSujets"
                  :title ="forum.title"
                  link
              ></v-card>
            </nuxt-link>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>

// definePageMeta({
//   middleware: async function(to, from) {
//     const { session, refresh } = await useSession();
//     await refresh();
//     const connected = ref(false);
//     connected.value = !(session.value.login === '');
//     console.log(connected.value.login)
//   },
// });

</script>

<script>
import Header from '@/components/Header.vue'

export default {
  props: {
    connected: Boolean,
  },
  components: {
    Header
  },
  data() {
    return {
      session: useSession(),
      forums: [],
    };
  },
  async mounted() {
    try {
      this.forums = await $fetch('api/forums');
    } catch (error) {
      console.error('Erreur lors de la récupération des forums :', error);
    }
  },
};
</script>

<style>

</style>