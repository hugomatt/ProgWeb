<template>
  <div class="text-md-center">
    <h2>Register</h2>
    <v-layout>
      <v-flex xs6 offset-xs3>
        <v-card>
          <v-card-text>
            <v-text-field v-model="username" label="Username" required></v-text-field>
            <v-text-field v-model="email" label="Email" required></v-text-field>
            <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
          </v-card-text>
          <v-btn class="mb-3" success @click="addElement">Register</v-btn>
        </v-card>
      </v-flex>
    </v-layout>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    username: '',
    password: '',
    email: '',
    msgStatus: '',
    todos: []
  }),
  methods: {
    async addElement () {
      console.log(this.username)
      console.log(this.password)
      console.log(this.email)
      if (this.password === '' || this.username === '') {
        console.log('empty')
        this.msgStatus = 'Nom, mot de passe ainsi que mail est necessaire !!'
        alert(this.msgStatus)
      } else {
        if (this.$session.id()) {
          this.msgStatus = 'Un utilisateur est déjà connecté'
          alert(this.msgStatus)
        } else {
          try {
            // add new user
            const res = await this.axios.post(
              '/api/addElement',
              {
                username: this.username,
                password: this.password,
                email: this.email
              }
            )
            this.info = res.data.username
            console.log('ajouté !')
            this.msgStatus =
              this.username + ' votre compte à bien été crée !'
            console.log(this.msgStatus)
            alert(this.msgStatus)
            this.$router.push('Home')
          } catch (error) {
            this.error = error.response.data.message
            console.log('response', JSON.stringify(error.response))
          }
        }
      }
    }
  }
}
</script>
