<template>
  <div class="Article">
    <h1 class="subheading grey--text">Article</h1>
    <v-container class="my-5">
    <v-expansion-panels accordion>
    <v-expansion-panel v-for="project in myProjects" :key="project.title">
        <v-expansion-panel-header>
            {{project.title}}
        </v-expansion-panel-header>
        <v-expansion-panel-content class="grey--text">
            <div class="font-weight-bold">By {{project.person}}</div>
            <div class="font-weight-bold">Due by {{project.date}}</div>
            <div>{{project.content}}</div>
        </v-expansion-panel-content>
    </v-expansion-panel>
</v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      projects: [
        { title: 'Maladie', person: 'Thomas', date: '10/08/2019', status: 'complete', content: 'les ravages de la peste noir' },
        { title: 'Moto', person: 'Cédric', date: '09/09/2019', status: 'ongoing', content: 'Mon futur achat' },
        { title: 'Argent', person: 'Hugo', date: '01/10/2019', status: 'ongoing', content: 'Comment gagner du fric en masse' },
        { title: 'Casque', person: 'Stéphane', date: '09/10/2019', status: 'overdue', content: 'Casque spéciale banane' }
      ]
    }
  },
  computed: {
    myProjects () {
      return this.projects.filter(project => {
        return project.person
      })
    }
  }
}
</script>
