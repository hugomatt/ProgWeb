<template>
  <div class="Article">
    <h1 class="subheading grey--text">Article</h1>
    <v-snackbar v-model="snackbar" :timeout="4000" top color="#000000">
      <span>Ajout réussi</span>
      <v-btn color="#FF0000" @click="snackbar = false">Fermer</v-btn>
    </v-snackbar>
    <v-snackbar v-model="snackbar2" :timeout="4000" top color="#000000">
      <span>Suppression réussi</span>
      <v-btn color="#FF0000" @click="snackbar2 = false">Fermer</v-btn>
    </v-snackbar>
    <v-container class="my-5">
      <v-expansion-panels accordion>
        <v-expansion-panel v-for="project in myProjects" :key="project.title">
          <v-expansion-panel-header>{{project.title}}</v-expansion-panel-header>
          <v-expansion-panel-content class="grey--text">
            <div class="font-weight-bold">Par {{project.person}}</div>
            <div class="font-weight-bold">Depuis le {{project.date}}</div>
            <div>{{project.content}}</div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
    <v-dialog max-width="600px" v-model="dialog">
      <template v-slot:activator="{on}">
        <v-btn color="#FF0000" text v-on="on" class="success">Ajouter nouvel article</v-btn>
      </template>
      <v-card elevation="24">
        <v-card-title>
          <h2>Ajouter un nouvel article</h2>
        </v-card-title>
        <v-form class="px-3" ref="form">
          <v-text-field label="Title" v-model="title" prepend-icon="mdi-folder" :rules="inputRules"></v-text-field>
          <v-textarea
            label="Description"
            v-model="content"
            prepend-icon="mdi-pen"
            :rules="inputRules"
          ></v-textarea>
          <v-spacer></v-spacer>
          <v-menu
            v-model="menu1"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="due"
                label="Date de création"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="due" color="#203DD1" @input="menu1 = false"></v-date-picker>
          </v-menu>
          <v-select
            v-model="status"
            prepend-icon="mdi-circle"
            :items="stats"
            :menu-props="{ top: true, offsetY: true }"
            label="Statut"
          ></v-select>
          <v-btn
            class="success mx-0 mt-3"
            color="#59D120"
            @click="submit"
            :loading="loading"
          >Ajout article</v-btn>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog max-width="600px" v-model="dialog2">
      <template v-slot:activator="{on}">
        <v-btn color="#FF0000" text v-on="on" class="success">Supprimer un article</v-btn>
      </template>
      <v-card elevation="24">
        <v-card-title>
          <h2>Suppression d'article</h2>
        </v-card-title>
        <v-form class="px-3" ref="form">
          <v-text-field label="ID" v-model="ID" prepend-icon="mdi-folder" :rules="outputRules"></v-text-field>
          <v-btn class="success mx-0 mt-3" color="#FF0000" @click="del">Suppr article</v-btn>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      projects: [],
      status: 'ongoing',
      stats: ['ongoing', 'overdue', 'complete'],
      due: new Date().toISOString().substr(0, 10),
      menu1: false,
      title: '',
      content: '',
      ID: '',
      inputRules: [v => v.length >= 3 || 'Minimum 3 caractère'],
      outputRules: [v => v.length >= 2 || 'Veuillez selectionner une ligne'],
      loading: false,
      dialog: false,
      dialog2: false,
      snackbar: false,
      snackbar2: false
    }
  },
  created () {
    this.fetchEventsList()
    this.timer = setInterval(this.fetchEventsList, 1000000000)
  },
  methods: {
    async submit () {
      if (!this.$session.id()) {
        this.msgStatus = 'Connexion inexistante'
        alert(this.msgStatus)
      } else {
        if (this.$session.get('username') !== 'Admin') {
          this.msgStatus =
            'Vous devez être administrateur afin de rajouter un article'
          alert(this.msgStatus)
        } else {
          if (this.$refs.form.validate()) {
            this.loading = true
            try {
              var user = this.$session.get('username')
              const res = await this.axios.post(
                '/api/article',
                {
                  title: this.title,
                  person: user,
                  date: this.due,
                  status: this.status,
                  content: this.content
                }
              )
              this.snackbar = true
              this.loading = false
              this.dialog = false
              this.titre = res.data.title
              console.log(this.titre)
              this.character = res.data.person
              console.log(this.character)
              var time = res.data.date
              console.log(time)
              var stat = res.data.status
              console.log(stat)
              var contenu = res.data.content
              console.log(contenu)
              const art = await this.axios.get(
                '/api/article'
              )
              this.$session.set('article', art.data)
              this.projects = this.$session.get('article')
            } catch (error) {
              this.error = error.response.data.message
              console.log('response', JSON.stringify(error.response))
            }
          }
        }
      }
    },
    async del () {
      if (!this.$session.id()) {
        this.msgStatus = 'Connexion inexistante'
        alert(this.msgStatus)
      } else {
        if (this.$session.get('username') !== 'Admin') {
          this.msgStatus =
            'Vous devez être administrateur afin de supprimer un article'
          alert(this.msgStatus)
        } else {
          try {
            await this.axios.post('/api/suprarticle', {
              ID: this.ID
            })
            this.snackbar2 = true
            await this.axios.get(
              '/api/article'
            )
            this.$router.push('Article')
          } catch (error) {
            this.error = error.response.data.message
            console.log('response', JSON.stringify(error.response))
          }
        }
      }
      this.dialog2 = false
    },
    async fetchEventsList () {
      if (!this.$session.id()) {
      } else {
        const art = await this.axios.get('/api/article')
        this.$session.set('article', art.data)
        this.projects = this.$session.get('article')
      }
    }
  },
  computed: {
    myProjects () {
      return this.projects.filter(project => {
        return project.person
      })
    }
  }
}
</script>
