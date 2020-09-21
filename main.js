// ★STEP2
// https://jp.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}


// ★STEP1
new Vue({
  el: '#app',
  data: {
    todos: [],
    options: [
      { value: -1, label: 'ALL' },
      { value: 0, label: 'DOING' },
      { value:1, label:'DONE'}
    ],
    current: -1,
    keyword: '',
    searchkey: 0
  },
  computed:{
    computedTodos: function () {
      console.log(this.todos);
      if (this.keyword !== '') {
      for (var i in this.todos) {
        this.todos[i].searchkey = 0;
        var searchword = this.todos[i].comment;
        console.log(searchword);
        console.log(this.keyword);
        if (searchword.indexOf(this.keyword) !== -1) {
          this.todos[i].searchkey = 1;
          console.log(this.todos);
        }
      }
      }
      return this.todos.filter(function (el) {
        if (this.keyword === '') {
          // console.log(el.searchkey);

          return this.current < 0 ? true : this.current === el.state

        } else {
          console.log('あるよー');
           console.log(el.searchkey);
          return el.searchkey == 1 ? true : false;

        }
      }, this)

    //  this.todos.searchkey = 0;

    },
    labels() {
      return this.options.reduce(function (a, b) {
        return Object.assign(a,{[b.value]: b.label})
      },{})
    }
  },
  watch: {
    todos: {
      handler: function (todos) {
        todoStorage.save(todos)
      },
      deep:true
    }
  },
  created() {
    this.todos = todoStorage.fetch()
  },
   methods: {
     doAdd: function (event, value) {
       var comment = this.$refs.comment

       if (!comment.value.length) {
         return
       }

       this.todos.push({
         id: todoStorage.uid++,
         comment: comment.value,
         state: 0,
         searchkey:0
       })
       comment.value = ''
     },
     doChangeState: function (item) {
       item.state = item.state ? 0 : 1
     },
     doRemove: function (item) {
       var index = this.todos.indexOf(item)
       this.todos.splice(index, 1)
     }

   }
})
