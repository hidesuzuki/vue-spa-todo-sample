<template>
  <div id="app">
    <table>
      <thead>
      <tr>
        <th class="id">ID</th>
        <th class="comment">コメント</th>
        <th class="state">状態</th>
        <th class="button">-</th>
      </tr>
      <tr v-for="item in todos" v-bind:key="item.id">
        <th> {{ item.id }}</th>
        <td> {{ item.comment }}</td>
        <td class="state">
          <button @click="doChangeState(item)">{{ item.state }}</button>
        </td>
        <td class="button">
          <button @click="doRemove(item)">削除</button>
        </td>
      </tr>
      </thead>
    </table>
    <h2>新しい作業の追加</h2>
    <label for="newComment">コメント</label>
    <input id="newComment" v-model="comment" placeholder="Todos" >
    <button @click="doAdd">追加</button>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        todos: [{id:1, comment:"sample", state: 0}],
        comment: "",
      }
    },
    mounted(){
      if(localStorage.todos){
        this.todos = localStorage.todos;
      } else {
        this.todos = [];
      }
    },
    methods: {
      doAdd() {
        if(!this.comment){
          return;
        }

        let lastId = this.todos.slice(-1)[0].id;

        this.todos.push({
          id: lastId,
          comment: this.comment,
          state: 0
        });
        localStorage.todos = this.todos;
        this.comment = "";
      },
      doChangeState(item){
        item.state = item.state ? 0 : 1;
      },
      doRemove(item){
        let index = this.todos.indexOf(item);
        this.todos.splice(index, 1);
        localStorage.todos = [];
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