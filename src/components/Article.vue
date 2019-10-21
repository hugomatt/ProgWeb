<template>
  <div class="Article">
    <h1 class="subheading grey--text">Article</h1>
    <v-snackbar v-model="snackbar" :timeout="4000" top color="#000000">
      <span>Ajout réussi</span>
      <v-btn flat color="#FF0000" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-container class="my-5">
    <v-expansion-panels accordion>
    <v-expansion-panel v-for="project in myProjects" :key="project.title">
        <v-expansion-panel-header>
            {{project.title}}
        </v-expansion-panel-header>
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
      <v-btn flat color="#FF0000" text v-on="on" class="success">Add new article</v-btn>
    </template>
    <v-card elevation="24">
      <v-card-title>
        <h2>Add a new article</h2>
      </v-card-title>
      <v-form class="px-3" ref="form">
        <v-text-field label="Title" v-model="title" prepend-icon="mdi-folder" :rules="inputRules"></v-text-field>
        <v-textarea label="Description" v-model="content" prepend-icon="mdi-pen" :rules="inputRules"></v-textarea>
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
            prepend-icon= mdi-calendar
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="due" color="#203DD1" @input="menu1 = false"></v-date-picker>
      </v-menu>
        <v-btn flat class="success mx-0 mt-3" color="#59D120" @click="submit" :loading="loading">Add article</v-btn>
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
      due: new Date().toISOString().substr(0, 10),
      menu1: false,
      title: '',
      content: '',
      inputRules: [
        v => v.length >= 3 || 'Minimum length is a 3'
      ],
      loading: false,
      dialog: false,
      snackbar: false
    }
  },
  methods: {
    async submit () {
      if (!this.$session.id()) {
        this.msgStatus = 'You are not connected'
        alert(this.msgStatus)
      } else {
        if (this.$refs.form.validate()) {
          this.loading = true
          try {
            var user = this.$session.get('username')
            const res = await this.axios.post('http://localhost:4000/api/article', {
              title: this.title,
              person: user,
              date: this.due,
              status: 'ongoing',
              content: this.content
            })
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
            const art = await this.axios.get('http://localhost:4000/api/article')
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
  computed: {
    myProjects () {
      return this.projects.filter(project => {
        return project.person
      })
    }
  }
}
</script>
