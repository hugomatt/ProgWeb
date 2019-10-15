<template>
<nav>
      <v-toolbar></v-toolbar>
    <v-snackbar v-model="snackbar" :timeout="4000" top color="#000000">
      <span>Ajout réussi</span>
      <v-btn flat color="#FF0000" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
      <router-view></router-view>
      <v-container class="fill-height">
        <v-row align="center" justify="center"></v-row>
      </v-container>
      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <v-list-item>
          <v-list-item-avatar>
            <v-img
              src="https://wir.skyrock.net/wir/v1/profilcrop/?c=mog&w=301&h=301&im=%2Fbig.124165283.jpg"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Nom de d'utilisateur</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-item v-for="item in items" :key="item.title" link router :to="item.route">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    <v-app-bar
      absolute
      fixed
      color="#fcb69f"
      dark
      src="https://picsum.photos/1920/1080?random"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>HyperSiteConsulting</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-spacer></v-spacer>
      <v-btn color="#40A461" @click="logout" >
        <span>Sign out</span>
        <v-icon right color="#00000">mdi-logout</v-icon>
        </v-btn>
    </v-app-bar>
       <v-flex>
        <Popup @articleAdded="snackbar = true" />
        </v-flex>
    <div class="text-center">
      <back-to-top text="Back to top"></back-to-top>
    </div>
</nav>
</template>

<script>
import Popup from '@/components/Popup.vue'
export default {
  components: { Popup },
  name: 'app',
  data () {
    return {
      activeBtn: 1,
      offsetTop: 0,
      showNav: true,
      drawer: false,
      items: [
        { title: 'Home', icon: 'mdi-home', route: '/home' },
        { title: 'About', icon: 'mdi-help-box', route: '/about' },
        { title: 'Login', icon: 'mdi-account', route: '/login' },
        { title: 'Article', icon: 'mdi-book', route: '/article' }
      ],
      snackbar: false
    }
  },
  methods: {
    async logout () {
      this.$session.destroy()
      var msgStatus = this.$session.get('ID')
      console.log(msgStatus)
    }
  }
}
</script>
