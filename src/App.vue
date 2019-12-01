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
        <td> {{item.comment }}</td>
        <td class="state">
          <button>{{ item.state }}</button>
        </td>
        <td class="button">
          <button>削除</button>
        </td>
      </tr>
      </thead>
    </table>
    <h2>新しい作業の追加</h2>
    <form class="add-form" v-on:submit.prevent="doAdd">
      <label for="newComment" value="ss" />
      <input id="newComment" type="text" placeholder="Todos" v-bind:title="comment">
      <button type="submit">追加</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        todos: [{id: 1, comment: "コメント", state: "状態"}],
        comment: 'こここ',
      }
    },
    methods: {
      doAdd() {

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