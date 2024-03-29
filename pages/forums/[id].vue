<script>
import Header from '@/components/Header.vue'
import {toArray} from "#app/utils.js";
export default {
  components: {
    Header
  },
  data() {
    return {
      sujets: null,
      id: this.$route.params.id
    };
  },
  async mounted() {
    try {
      this.sujets = await $fetch(`/api/forums/${this.id}/sujets`, {
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
  <div v-if="sujets"></div>
  {{id}}
</template>

<style scoped>

</style>