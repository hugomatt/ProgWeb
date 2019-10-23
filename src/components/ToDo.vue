<template>
  <div id="todo">
    <br />
    <br />
    <br />
    <v-container>
      <v-layout text-center wrap>
        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field v-model="title" label="Title" required></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="content" label="Content" required></v-text-field>
              </v-col>
              <v-col>
                <v-btn v-on:click="addTodo">Ajouter</v-btn>
                <br />
                <br />
                <li v-for="todo in todoList" :key="todo.id">
                  <p align="left">
                    Title : {{todo.title}}
                    <br />
                    content :{{todo.content}}
                  </p>
                  <br />
                  <br />
                  <v-btn v-on:click="delTodo">Supprimer</v-btn>
                  <br />
                  <br />
                </li>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    title: '',
    content: '',
    todoList: []
  }),
  methods: {
    addTodo () {
      this.todoList.push({
        title: this.title,
        content: this.content
      })
      console.log(JSON.stringify(this.todoList))
      this.newTodolist = ''
    },
    delTodo (todo) {
      const todoIndex = this.todoList.indexOf(todo)
      this.todoList.splice(todoIndex, 1)
      console.log(JSON.stringify(this.todoList))
    }
  }
}
</script>
