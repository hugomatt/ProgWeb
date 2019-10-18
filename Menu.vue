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
            <v-list-item-title>{{username}}</v-list-item-title>
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
      <router-link to="/login" @ckick="affichage" v-show="visi">
      <v-btn color="#FF0000">
        <span>Sign in</span>
        <v-icon right color="#00000">mdi-account</v-icon>
        </v-btn>
      </router-link>
      <router-link to="/register">
        <v-btn color="#FF0000" @click="visible" v-show="visi">
        <span>Register</span>
        <v-icon right color="#00000">mdi-account</v-icon>
        </v-btn>
      </router-link>
      <router-link to="/home">
      <v-btn color="#FF0000" @click="logout" v-show="out">
        <span>Sign out</span>
        <v-icon right color="#00000">mdi-logout</v-icon>
        </v-btn>
      </router-link>
    </v-app-bar>
       <v-flex>
        <Popup @articleAdded="snackbar = true" />
        </v-flex>
        <v-flex>
        <Login @visu="visi = false" />
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
      username: this.$session.get('username'),
      out: true,
      visi: true,
      showNav: true,
      drawer: false,
      items: [
        { title: 'Home', icon: 'mdi-home', route: '/home' },
        { title: 'About', icon: 'mdi-help-box', route: '/about' },
        { title: 'Article', icon: 'mdi-book', route: '/article' }
      ],
      snackbar: false,
      id: 0
    }
  },
  created () {
    this.fetchEventsList()
    this.timer = setInterval(this.fetchEventsList, 10)
  },
  methods: {
    async logout () {
      var msgStatus = this.$session.get('ID')
      console.log(msgStatus)
      this.$session.destroy()
      this.username = ''
    },
    async fetchEventsList () {
      this.username = this.$session.get('username')
    }
  }
}
</script>
