<template>
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
        <v-btn flat class="success mx-0 mt-3" color="#59D120" @click="submit" :loading="loading">Add article</v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
// import { format } from 'path'

export default {
  data () {
    return {
      title: '',
      content: '',
      due: null,
      inputRules: [
        v => v.length >= 3 || 'Minimum length is a 3'
      ],
      loading: false,
      dialog: false
    }
  },
  methods: {
    async submit () {
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
          this.loading = false
          this.dialog = false
          this.$emit('articleAdded')
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
        } catch (error) {
          this.error = error.response.data.message
          console.log('response', JSON.stringify(error.response))
        }
      }
    }
  }
}
</script>
