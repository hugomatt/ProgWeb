<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/login" tag="span">
        <v-btn flat>Login</v-btn>
      </router-link>
      <router-link to="/register" tag="span">
        <v-btn flat>Register</v-btn>
      </router-link>
    </v-app-bar>
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
    <v-content>
      <Login />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data: () => ({
    //
  })
}
</script>
