<template>
  <div id="app">
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo"
             autofocus autocomplete="off"
             placeholder="What needs to be done?"
             v-model="newTodo"
             @keyup.enter="addTodo" >
    </header>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  },
  data (){
    return {
      newTodo: ""
    }
  },
  computed: {
    todos(){
      let todos = JSON.parse(localStorage.getItem('todos-vuejs'));
      todos.forEach(function (todo, index){
        todo.id = index;
      });
      todoStrage.uid = todos.length;
      return null
    }
  },
  methods: {
    addTodo() {
      let value = this.newTodo && this.newTodo.trim();
      if(!value){
        return;
      }
      this.todos.push();
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
