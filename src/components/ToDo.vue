<template>
  <v-container>
    <v-layout text-center wrap>
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="ID"
                label="ID"
                required
                v-show="visible"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="Password"
                label="Password"
                required
                v-show="visible"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-btn v-on:click="affichage" v-show="visibleLog">login</v-btn>
              <v-btn v-on:click="verification" v-show="visible">GO</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    ID: '',
    Password: '',
    visible: false,
    visibleLog: true
  }),
  methods: {
    affichage () {
      // eslint-disable-next-line eqeqeq
      this.visible = !this.visible
      this.visibleLog = !this.visibleLog
    },
    verification () {
      // eslint-disable-next-line eqeqeq
      if (this.ID == 'admin' && this.Password == 'admin') {
        alert('Welcome')
        this.visible = false
        this.visibleLog = true
      } else {
        alert('ID or Password unknow')
      }
    }
  }
}
</script>
