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
              <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
            </v-col>
          </v-row>
          <v-btn @click="login">Connexion</v-btn>
        </v-container>
      </v-form>
      <router-view></router-view>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    user: '',
    password: '',
    msgStatus: '',
    todos: []
  }),

  methods: {
    async login () {
      if (this.password === '' || this.user === '') {
        console.log('empty')
        this.msgStatus = 'Username & Password are required !'
        alert(this.msgStatus)
      } else {
        if (this.$session.id()) {
          this.msgStatus = 'A user is already connected'
          alert(this.msgStatus)
        } else {
          try {
            const res = await this.axios.post(
              '/api/login',
              {
                username: this.user,
                password: this.password,
                userId: this.$session.id()
              }
            )
            this.$session.start()
            const art = await this.axios.get(
              '/api/article'
            )
            this.$session.set('article', art.data)

            this.$session.set('username', res.data.username)
            this.$session.set('email', res.data.email)
            this.$session.set('ID', res.data.ID)
            var id = this.$session.id()
            console.log(id)
            console.log('Logged !')
            this.$router.push('Home')
          } catch (error) {
            this.error = error.response.data.message
            console.log('response', JSON.stringify(error.response))
            this.msgStatus = 'Username or Password is wrong !'
            alert(this.msgStatus)
          }
        }
      }
    }
  }
}
</script>
