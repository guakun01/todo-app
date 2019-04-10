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
    // var todoContainer = e('#id-div-container')
    // var t = templateTodo(todo)
    // todoContainer.insertAdjacentHTML('beforeBegin', 'gua' + t)
    // todoContainer.insertAdjacentHTML('beforeend', t)
    insertTodo(todo, false)    
    saveTodos()
})
var insertTodo = function(todo, done) {
    var todoContainer = e('#id-div-container')
    var t = templateTodo(todo, done)
    // todoContainer.insertAdjacentHTML('beforeBegin', 'gua' + t)
    todoContainer.insertAdjacentHTML('beforeend', t)
}
// var todo1 = {
//     content: 'todo1',
//     done: false
// }
// var todo2 = {
//     content: 'todo1',
//     done: false
// }

// var todos = [
//     todo1,
//     todo2,
// ]
// var strTodos = JSON.stringify(todos)

// var todos = JSON.parse(localStorage.gua)

// var todos = [
//     {
//         content: 'todo1',
//         done: false,
//     },
//     {
//         content: 'todo2',
//         done: false,
//     },
// ]

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
    // 1 先选出所有的 content 标签
    // 2 取出 todo
    // 3 添加到一个 数组里
    // 4 保存数组

    // 1 先选出所有的 content 标签
    var contents = es('.todo-content')
    var todos = []
    for (var i = 0; i < contents.length; i++) {
        // 2 取出 todo
        var c = contents[i]
        var done = c.parentElement.classList.contains('done')
        var todo = {
            done ,
            content: c.innerHTML,
        }
        // var todo = c.innerHTML
        // 3 添加到一个 数组里
        todos.push(todo)
    }
    // 4 保存数组
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