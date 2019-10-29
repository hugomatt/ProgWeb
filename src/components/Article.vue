<template>
  <div class="Article">
    <h1 class="subheading grey--text">Article</h1>
    <v-snackbar v-model="snackbar" :timeout="4000" top color="#000000">
      <span>Ajout réussi</span>
      <v-btn flat color="#FF0000" @click="snackbar = false">Fermer</v-btn>
    </v-snackbar>
    <v-snackbar v-model="snackbar2" :timeout="4000" top color="#000000">
      <span>Suppression réussi</span>
      <v-btn flat color="#FF0000" @click="snackbar2 = false">Fermer</v-btn>
    </v-snackbar>
    <v-container class="my-5">
      <v-expansion-panels accordion>
        <v-expansion-panel v-for="project in myProjects" :key="project.title">
          <v-expansion-panel-header>{{project.title}}</v-expansion-panel-header>
          <v-expansion-panel-content class="grey--text">
            <div class="font-weight-bold">By {{project.person}}</div>
            <div class="font-weight-bold">Due by {{project.date}}</div>
            <div>{{project.content}}</div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
    <v-dialog max-width="600px" v-model="dialog">
      <template v-slot:activator="{on}">
        <v-btn flat color="#FF0000" text v-on="on" class="success">Ajouter nouvel article</v-btn>
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
                label="Date of creation"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="due" color="#203DD1" @input="menu1 = false"></v-date-picker>
          </v-menu>
          <v-row align="center">
            <v-col cols="12">
              <v-select
                v-model="status"
                :items="stats"
                :menu-props="{ top: true, offsetY: true }"
                label="status"
              ></v-select>
            </v-col>
          </v-row>
          <v-btn
            flat
            class="success mx-0 mt-3"
            color="#59D120"
            @click="submit"
            :loading="loading"
          >Ajout article</v-btn>
        </v-form>
      </v-card>
    </v-dialog>
<<<<<<< HEAD
=======
    <v-dialog max-width="600px" v-model="dialog2">
    <template v-slot:activator="{on}">
        <v-btn flat color="#FF0000" text v-on="on" class="success">Supprimer un article</v-btn>
      </template>
    <v-card elevation="24">
      <v-card-title>
        <h2>Suppression d'article</h2>
      </v-card-title>
      <v-form class="px-3" ref="form">
          <v-text-field label="ID" v-model="ID" prepend-icon="mdi-folder" :rules="outputRules"></v-text-field>
          <v-btn
            flat
            class="success mx-0 mt-3"
            color="#FF0000"
            @click="del"
          >Suppr article</v-btn>
      </v-form>
    </v-card>
    </v-dialog>
>>>>>>> developpe
  </div>
</template>

<script>
export default {
  data () {
    return {
      projects: [],
      stats: ['ongoing', 'overdue', 'complete'],
      status: '',
      due: new Date().toISOString().substr(0, 10),
      menu1: false,
      title: '',
      content: '',
<<<<<<< HEAD
      inputRules: [v => v.length >= 3 || 'Minimum length is a 3'],
      loading: false,
      dialog: false,
      snackbar: false
=======
      ID: '',
      inputRules: [v => v.length >= 3 || 'Minimum 3 caractère'],
      outputRules: [v => v.length >= 2 || 'Veuillez selectionner une ligne'],
      loading: false,
      dialog: false,
      dialog2: false,
      snackbar: false,
      snackbar2: false
>>>>>>> developpe
    }
  },
  created () {
    this.fetchEventsList()
    this.timer = setInterval(this.fetchEventsList, 1000000000)
  },
  methods: {
    async submit () {
      if (!this.$session.id()) {
        this.msgStatus = 'You are not connected'
        alert(this.msgStatus)
      } else {
        if (this.$session.get('username') !== 'admin') {
          this.msgStatus =
            'You are not alowed to add an articles, you need to be administrator'
          alert(this.msgStatus)
        } else {
          if (this.$refs.form.validate()) {
            this.loading = true
            try {
              var user = this.$session.get('username')
              const res = await this.axios.post(
                'http://localhost:4000/api/article',
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
                'http://localhost:4000/api/article'
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
<<<<<<< HEAD
=======
    async del () {
      if (!this.$session.id()) {
        this.msgStatus = 'You are not connected'
        alert(this.msgStatus)
      } else {
        if (this.$session.get('username') !== 'admin') {
          this.msgStatus =
            'You are not alowed to add an articles, you need to be administrator'
          alert(this.msgStatus)
        } else {
          try {
            await this.axios.post(
              'http://localhost:4000/api/suprarticle',
              {
                ID: this.ID
              }
            )
            const art = await this.axios.get(
              'http://localhost:4000/api/article'
            )
            this.$session.set('article', art.data)
            this.projects = this.$session.get('article')
          } catch (error) {
            this.error = error.response.data.message
            console.log('response', JSON.stringify(error.response))
          }
        }
      }
      this.dialog2 = false
      this.snackbar2 = false
    },
>>>>>>> developpe
    async fetchEventsList () {
      if (!this.$session.id()) {
      } else {
        const art = await this.axios.get('http://localhost:4000/api/article')
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
