import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

var STORAGE_KEY = 'todos-vuejs-2.0'
var todoStrage = {
  fetch: function(){
    var todos = JSON.parse(localStrage.getItem(STORAGE_KEY) || '[]');
    todos.foreach(function(todo, index) {
      todo.id = index;
    });
    todoStrage.uid = todos.length;
    return todos;
  },
  save: function(todos){
    localStrage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
};

var filters = {
  all: function(todos) {
    return todos;
  },
  active: function(todos) {
    return todos.filter(function(todo){
      return !todo.completed;
    })
  },
  completed: function(todos){
    return todos.filter(function(todo){
      return todo.completed;
    })
  }
};
let app = new Vue({
  data: {
    todos: todoStrage.fetch(),
    newToto: '',
    editedTodo: null,
    visibility: 'all'
  },
  watch:{
    todos:{
      handler: function(todos) {
        todoStrage.save(todos);
      },
      deep: true
    }
  },
  computed: {
    filteredTodos: function(){
      return filters[this.visibility](this.todos)
    },
    remaining: function() {
      return filters.active(this.todos).length
    },
    allDone: {
      get: function() {
        return this.remaining === 0
      },
      set: function(value){
        this.todos.forEach(function(todo){
          todo.completed = value
        })
      }

    }
  },
  filters:{
    pluralize: function(n){
      return n === 1? 'item' : 'items';
    }
  },
  methods: {
    addTodo: function () {
      let value = this.newTodo && this.newTodo.trim();
      if (!value) {
        return;
      }
      this.todos.push({
        id: todoStrage.uid++,
        title: value,
        completed: false
      });
      this.newTodo = ''
    },
    removeTodo: function (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
    },
    editTodo: function (todo) {
      this.beforeEditCache = todo.title;
      this.editedTodo = todo;
    },
    doneEdit: function (todo) {
      if (!this.editedTodo) {
        return;
      }
      this.editedTodo = null;
      todo.title = todo.title.trim();
      if (!todo.title) {
        this.removeTodo(todo);
      }
    },
    cancelEdit: function (todo) {
      this.editesTodo = null;
      todo.title = this.beforeEditCache;
    },
    removeCompleted: function(){
      this.todos = filters.active(this.todos)
    }
  },
  directives: {
    'todo-focus': function(el, binding) {
      if(binding.value){
        el.focus()
      }
    }
  }
});

function onHashChange() {
  let visibility =~ window.location.hash.replace(/#\/?/, '');
  if(filters[visibility]){
    app.visibility = visibility;
  } else {
    window.location.hash = '';
    app.visibility = 'all';
  }
}

window.addEventListener('hashchange', onHashChange);
onHashChange();

app.$mount('#app');
