<template>
  <v-container>
    <v-layout text-center wrap>
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field v-model="user" label="User" required></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field v-model="password" label="Password" required></v-text-field>
            </v-col>
          </v-row>
          <v-btn @click="addElement">Ajouter</v-btn>
          <v-btn @click="login">Connexion</v-btn>
        </v-container>
      </v-form>
      <v-card class="mx-auto" max-width="400" tile>
        <v-list-item v-for="(item, index) in todos" v-bind:key="item.id">
          <v-list-item-content>
            <v-list-item-title>
              {{ item.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ item.description }}
              <v-btn @click="rmElement(index)">Remove</v-btn>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    user: '',
    password: '',
    msgWarning: 'error',
    msgStatus: '',
    todos: []
  }),
  methods: {
    login () {
      if (this.password === '' || this.user === '') {
        console.log('empty')
        this.msgWarning = 'warning'
        this.msgStatus = 'Username & Password are required !'
        alert(this.msgStatus)
      } else {
        // connecter l'utilisateur
        console.log('login request')
        this.axios.post('http://localhost:4000/api/login', {
          username: this.user,
          password: this.password
        })
          .then(jsondata => console.log('response is:', jsondata), alert(this.jsondata))
          .catch(console.log)
      }
    },
    logout () {
    },
    addElement () {
      if (this.password === '' || this.user === '') {
        console.log('empty')
        this.msgWarning = 'warning'
        this.msgStatus = 'Username & Password are required !'
        alert(this.msgStatus)
      } /* else {
        const jsondata = this.axios.post('http://localhost:4000/api/addElement', {
          username: this.user
        })
          .then(jsondata => console.log('response is:', jsondata), alert(this.jsondata))
          .catch(console.log)

        if (!jsondata.data.status) {
          console.log('user existant')
          this.msgWarning = 'warning'
          this.msgStatus = 'The User ' + this.user + ' already exist !'
        } */ else {
        // add new user
        this.axios.post('http://localhost:4000/api/addElement', {
          username: this.user,
          password: this.password
        })
          .then(jsondata => console.log('response is:', jsondata), alert(this.jsondata))
          .catch(console.log)
        console.log('ajouté !')
        this.msgStatus = 'The User ' + this.user + ' has been successfully created !'
        console.log(this.msgStatus)
        alert(this.msgStatus)
      }
    }
  }
  /* rmElement (index) {
      console.log('index', index)
      this.todos.splice(index, 1)
    } */
  // ajouter un utilsateur
  /* this.todos.push({
        id: this.todos.length,
        user: this.user,
        password: this.password
      } */
}
</script>
