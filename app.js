//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);

//Functions

function makeNewTodoElementFromUserInput() {
    // Todo DIV
    const todoDiv = document.createElement('div'); // creating div
    todoDiv.classList.add("todo"); // adding class to div
    // create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    //bringing li inside div
    todoDiv.appendChild(newTodo);

    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
    completedButton.classList.add("complte-btn");
    todoDiv.appendChild(completedButton);

    //trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    return todoDiv;
}

function addTodo(event) {
    // to prevent form from submitting
    event.preventDefault();
    const todoDiv = makeNewTodoElementFromUserInput();
    const {localStorage} = window;
    const prevTodos = JSON.parse(localStorage.getItem('todos'));
    if (prevTodos) {
    }
    // new code here
    const newTodoJson = {
        id: Math.floor(Math.random() * 10000) + 10000,
        todoData: todoDiv.childNodes[0].childNodes[0].data,
        classList: 'todo-item',
    }
    if (!prevTodos) {
        const todos = [
            {
                todo: newTodoJson,
            }
        ]
        localStorage.setItem('todos', JSON.stringify(todos));
    } else {
        prevTodos.push({todo: newTodoJson});
        localStorage.setItem('todos', JSON.stringify(prevTodos));
    }
    // new code ends here
    //append to list
    todoList.appendChild(todoDiv);
    // clear todo
    todoInput.value = "";
}

function deleteCheck(e) {
    // e.target is used to Get the element that triggered a specific event
    const item = e.target;

    // Delete todo
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        todo.addEventListener('transitionend', function () {
            todo.remove();
        })
    }

    // chechmark
    if (item.classList[0] === "complte-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        filterTodo();
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (filterOption.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = "none";
                }
                break;
            case "un-Completed":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = "none";
                }
        }
    });
}


function fillPreviousTodos() {
    const {localStorage} = window;
    const prevTodos = JSON.parse(localStorage.getItem('todos'));
    console.log(prevTodos);
}

fillPreviousTodos();
