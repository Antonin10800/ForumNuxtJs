<template>
  <v-container>
    <v-row>
      <v-col class="justify-center">
        <h1 class="text-center mb-8">ForumNuxt</h1>

        <div v-if="isAdmin && editingForumId" class="edit-title">
          <v-text-field v-model="forumTitle" label="Modifier le titre" outlined></v-text-field>
          <v-btn @click="confirmEdit(editingForumId, forumTitle)" class="edit" color="primary">
            Valider
          </v-btn>
        </div>

        <div v-if="isAdmin" class="create-forum">
          <v-text-field v-model="newForumTitle" label="Titre du nouveau forum" outlined></v-text-field>
          <v-btn @click="createForum" class="create" color="success">
            Créer un forum
          </v-btn>
        </div>

        <v-list class="text-center">
          <v-list-item
              v-for="forum in forums"
              :key="forum.id"
              class="mb-4 content"
          >
            <v-btn v-if="isAdmin" @click="toggleEditForum(forum.id)" class="edit" icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <nuxt-link :to="`/forums/${forum.id}`" class="text-decoration-none text-h6">
              <v-card
                  class="mx-auto forum"
                  max-width="1000"
                  :subtitle="forum.nbSujets"
                  :title="forum.title"
                  link
              ></v-card>
            </nuxt-link>
            <v-btn v-if="isAdmin" @click="confirmDelete(forum.id)" class="delete" color="error" icon>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
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
      forums: [],
      isAdmin: false,
      deleteForumId: null,
      forumTitle: '',
      editingForumId: null,
      newForumTitle: ''
    };
  },
  methods: {
    async getForums() {
      try {
        this.forums = await $fetch('api/forums');
      } catch (error) {
        console.error('Erreur lors de la récupération des forums :', error);
      }
    },
    async deleteForum(forumId) {
      try {
        const response = await $fetch(`api/forums/${forumId}`, {
          method: 'DELETE'
        });

        if (response) {
          this.$success(`Le forum a été supprimé avec succès`)
          this.forums = this.forums.filter(forum => forum.id !== forumId);
        } else {
          this.$error(`Erreur lors de la suppression du forum`)
        }
      } catch (error) {
        console.error('Erreur lors de la suppression du forum :', error);
      }
    },
    async toggleEditForum(forumId) {
      this.forumTitle = '';
      this.editingForumId = forumId === this.editingForumId ? null : forumId;
      const forumIndex = this.forums.findIndex(forum => forum.id === forumId);
      if (forumIndex !== -1) {
        this.forumTitle = this.forums[forumIndex].title;
      }
    },
    async confirmEdit(forumId, newTitle) {
      try {
        const response = await $fetch(`api/forums/${forumId}`, {
          method: 'POST',
          body: JSON.stringify({ idForum: forumId, title: newTitle }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response && response.success) {
          this.$success(response.message);
          await this.getForums();
          this.editingForumId = null;
        } else {
          this.$error(response.message || 'Erreur lors de la mise à jour du forum');
        }
      } catch (error) {
        this.$error('Une erreur s\'est produite lors de la mise à jour du forum.');
      }
    },
    async createForum() {
      try {
        const response = await $fetch('api/forums', {
          method: 'PUT',
          body: JSON.stringify({ title: this.newForumTitle }),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response && response.success) {
          this.$success(response.message);
          await this.getForums();
          this.newForumTitle = '';
        } else {
          this.$error(response.message || 'Erreur lors de la création du forum');
        }
      } catch (error) {
        console.error('Erreur lors de la création du forum :', error);
        this.$error('Une erreur s\'est produite lors de la création du forum.');
      }
    },
    confirmDelete(forumId) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce forum ?')) {
        this.deleteForum(forumId);
      }
    }
  },
  async mounted() {
    const { session } = await useSession();
    if (session.value && session.value.login !== '' && session.value.login !== undefined && session.value.admin) {
      this.isAdmin = true
    }
    document.addEventListener('connected', async (event) => {
      const {session} = await useSession();
      if (session.value && session.value.login !== '' && session.value.login !== undefined && session.value.admin){
        this.isAdmin = true
      }
    })
    document.addEventListener('disconnected', async () => {
      this.isAdmin = false
    })
    document.addEventListener('refresh', async() =>{
      await this.getForums()
    })
    await this.getForums();
  }
};
</script>

<style scoped>
list-item {
  display: flex;
  align-items: center;
  justify-content: center;
}
.forum {
  min-width: 600px;
  margin-left: 10px;
  margin-right: 10px;
}

.delete, .edit {
  margin: 10px;
}
.edit-title {
  display: flex;
  align-items: center;
}
.create-forum {
  margin-bottom: 20px;
}
</style>
