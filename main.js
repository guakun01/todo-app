var log = function() {
    console.log.apply(console, arguments)
}
log('Todo app start!')

var e = function(selector) {
    return document.querySelector(selector)
}

var es = function(sel) {
    return document.querySelectorAll(sel)
}

var addButton = e('#id-button-add')
addButton.addEventListener('click', function() {
    var todoInput = e('#id-input-todo')
    var todo = todoInput.value
    if (!todo) {
        alert('不许添加一个空的进来！！！')
        return
    }
    insertTodo(todo, false)    
    saveTodos()
    todoInput.value = ''
})
var insertTodo = function(todo, done) {
    var todoContainer = e('#id-div-container')
    var t = templateTodo(todo, done)
    todoContainer.insertAdjacentHTML('beforeend', t)
}

var templateTodo = function(todo, done) {
    var status = ''
    if (done) {
        status = 'done'
    }
    var t = `
        <div class="todo-cell ${status}">
            <button class="todo-done">完成</button>
            <button class="todo-delete">删除</button>
            <span class='todo-content' contenteditable="true">${todo}</span>
        </div>
        `
    return t
}
var todoContainer = e('#id-div-container')
todoContainer.addEventListener('click', function(event) {
    log('container click', event, event.target)
    var target = event.target
    if(target.classList.contains('todo-done')) {
        log('点击了完成按钮')
        var todoDiv = target.parentElement
        toggleClass(todoDiv, 'done')
        saveTodos()
    } else if(target.classList.contains('todo-delete')) {
        log('点击了删除按钮', target)
        var todoDiv = target.parentElement
        todoDiv.remove()
        saveTodos()
    }
})

var toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

var save = function(array) {
    var s = JSON.stringify(array)
    localStorage.todos = s
}
var load = function() {
    var s = localStorage.todos
    return JSON.parse(s)
}

// 定义一个函数, 把页面上的所有 todo 用 save 保存
var saveTodos = function() {
    var contents = es('.todo-content')
    var todos = []
    for (var i = 0; i < contents.length; i++) {
        var c = contents[i]
        var done = c.parentElement.classList.contains('done')
        var todo = {
            done ,
            content: c.innerHTML,
        }
        todos.push(todo)
    }
    save(todos)
}
var loadTodos = function() {
    var todos = load()
    log('load todos', todos)
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i]
        insertTodo(todo.content, todo.done)
    }
}
loadTodos()