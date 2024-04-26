<script>
import Header from '~/components/Header.vue'
export default {
  components: {
    Header,
    // CreationSujet
  },
  data() {
    return {
      sujets: null,
      idForum: this.$route.params.idForums,
      idSujet: undefined,
      page: 1,
      isAdmin: false,
      pageMax: null,
      showCreateSujet: false,
      message:'',
      titreCreateSujet:'',
      displayCreateSujet: false,
      sujetTitle: '',
      editingsujetId: null
    };
  },

  methods: {

    async toggleEditsujet(sujetId) {
      this.sujetTitle = '';
      this.editingsujetId = sujetId === this.editingsujetId ? null : sujetId;
      const sujetIndex = this.sujets.findIndex(sujet => sujet.id === sujetId);
      if (sujetIndex !== -1) {
        this.sujetTitle = this.sujets[sujetIndex].title;
      }
    },
    async confirmEdit(sujetId, newTitle) {
      try {
        const response = await $fetch(`/api/sujets/${sujetId}`, {
          method: 'POST',
          body: {title: newTitle },
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response && response.success) {
          this.$success(response.message);
          await this.getSujets();
          this.editingsujetId = null;
        } else {
          this.$error(response.message);
        }
      } catch (error) {
        this.$error(error);
      }
    },
    
    async submit(){
      const {session} = await useSession();
      const body = {
        title: this.titreCreateSujet,
        author: session.value.idUser,
        sujet: this.idSujet,
        message: this.message
      };
      $fetch('/api/sujets', {
        method:'PUT',
        headers:{
          "Content-Type": "application/json",
        },
        body: body
      }).then((response) => {
        this.$success(response.success)
        let event = new Event('newer')
        document.dispatchEvent(event)
      }).catch((error) => {
        if (error.response._data.error !== undefined)
          this.$error(error.response._data.error)
        else
          this.$error(error.response._data.message)
      })

      this.showCreateSujet = false
      await this.getSujets()
    },
    confirmDelete(sujetId) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce sujet ?')) {
        this.deletesujet(sujetId);
      }
    },
    async deletesujet(sujetId) {
      try {
        const response = await $fetch(`/api/sujets/${sujetId}`, {
          method: 'DELETE'
        });

        if (response.success) {
          this.$success(response.message)
          await this.getSujets()
        } else {
          this.$error(response.message)
        }
      } catch (error) {
        this.$error(error);
      }
    },
    createSujet() {
      this.message =''
      this.titreCreateSujet=''
      this.showCreateSujet = !this.showCreateSujet
    },

    async getSujets() {
      $fetch(`/api/forums/${this.idForum}/sujets?page=${this.page}`)
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
      if (session.value.admin)
        this.isAdmin = true
    }
    document.addEventListener('connected', async (event) => {
      const {session} = await useSession();
      if (session.value && session.value.login !== '' && session.value.login !== undefined){
        this.displayCreateSujet = true
        if (session.value.admin)
          this.isAdmin = true
      }
    })
    document.addEventListener('disconnected', async () => {
      this.displayCreateSujet = false
      this.isAdmin = false
    })
    document.addEventListener('refresh', async() =>{
      await this.getSujets()
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

    <div v-if="isAdmin && editingsujetId" class="edit-title d-flex flex-row">
      <v-text-field class="input" v-model="sujetTitle" label="Modifier le titre" outlined></v-text-field>
      <v-btn @click="confirmEdit(editingsujetId, sujetTitle)" class="validate edit" color="secondary">
        Valider
      </v-btn>
    </div>

    <v-row>
      <v-col class="justify-center">
        <v-card class="mx-auto my-2"
                max-width="1000">
          <v-btn v-if="displayCreateSujet" @click="createSujet" color="secondary">Créer un sujet</v-btn>
          <v-card-title>
            <h1 class="text-center mb-8">sujets</h1>
          </v-card-title>
          <v-card-text v-if="sujets">
            <v-list class="text-center">

                <v-list-item v-for="sujet in sujets" :key="sujet.id" class="mb-4">
                  
                  <nuxt-link :to="`/sujets/${sujet.sujet_id}/sujets/${sujet.id}`" class="text-decoration-none text-h6">
                  <v-list-item-title>{{ sujet.title }}</v-list-item-title>
                  <v-list-item-subtitle>Auteur : {{ sujet.login }}</v-list-item-subtitle>
                    <v-list-item-title>Date de parution : {{ formattedDate(sujet.date) }}</v-list-item-title>
                    <v-list-item-title>Dernier message de : {{ sujet.last_message_author }}</v-list-item-title>
                  </nuxt-link>

                  <v-btn v-if="isAdmin" @click="toggleEditsujet(sujet.id)" class="edit ma-1" icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>

                  <v-btn v-if="isAdmin" @click="confirmDelete(sujet.id)" class="delete ma-1" color="error" icon>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
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
.edit{
  margin-left: 10px;
  margin-top: 10px;
}
</style>