<template>
  <div class="Home">
    <h1>Home</h1>
    <v-container class="my-5">
      <v-layout row class="mb-3">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small color="grey" @click="sortBy('title')" v-on="on">
              <v-icon left small>mdi-folder</v-icon>
              <span class="caption text-lowercase">Par nom d'article</span>
            </v-btn>
          </template>
          <span>Trier article par nom d'article</span>
        </v-tooltip>
      </v-layout>

      <br />

      <v-card flat :elevation="0" v-for="article in articles" :key="article.title">
        <v-layout row wrap :class="`pa-3 article ${article.status}`">
          <v-flex xs12 md6>
            <div class="caption grey--text">Titre article</div>
            <div>{{ article.title }}</div>
          </v-flex>
          <v-flex xs6 md2>
            <div class="caption grey--text">Edtiter par</div>
            <div>{{ article.person }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Depuis le</div>
            <div>{{ article.date }}</div>
          </v-flex>
          <v-flex xs2 sm4 md2>
            <br />
            <div class="right">
              <v-chip
                small
                :color="`${article.status}`"
                :class="`v-chip--active white--text caption my-2`"
              >{{ article.status }}</v-chip>
            </div>
          </v-flex>
        </v-layout>
        <br />
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articles: []
    }
  },
  created () {
    this.fetchEventsList()
    this.timer = setInterval(this.fetchEventsList, 1000000000)
  },
  methods: {
    async sortBy (prop) {
      this.articles.sort((a, b) => (a[prop] < b[prop] ? -1 : 1))
    },
    async fetchEventsList () {
      if (!this.$session.id()) {
      } else {
        const art = await this.axios.get('http://localhost:4000/api/article')
        this.$session.set('article', art.data)
        this.articles = this.$session.get('article')
      }
    }
  }
}
</script>

<style>
.article.complete {
  border-left: 4px solid #3cd1c2;
}

.article.ongoing {
  border-left: 4px solid orange;
}

.article.overdue {
  border-left: 4px solid red;
}

.v-chip.complete {
  background: #3cd1c2;
}

.v-chip.ongoing {
  background: #ffaa2c;
}

.v-chip.overdue {
  background: #f83e70;
}
</style>
