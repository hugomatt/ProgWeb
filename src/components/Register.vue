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
                    <v-btn class="mb-3" success @click='addElement'>Register</v-btn>
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
      if (this.password === '' || this.email === '' || this.username === '') {
        console.log('empty')
        this.msgStatus = 'Username, Password & Email are required !'
        alert(this.msgStatus)
      } else {
        // add new user
        this.axios.post('http://localhost:4000/api/addElement', {
          username: this.user,
          password: this.password,
          email: this.email
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
}
</script>
