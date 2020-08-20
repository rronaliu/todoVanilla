// select everything
// select the todo-form
const todoForm = document.querySelector('.todo-form');
// select the input box
const todoInput = document.querySelector('.todo-input');
// select the <ul> with class="todo-items"
const todoItemsList = document.querySelector('.todo-items');
// for search
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');

// array which stores every todos
let todos = [];

// add an eventListener on form, and listen for submit event
todoForm.addEventListener('submit', function(event) {
  // prevent the page from reloading when submitting the form
  event.preventDefault();
  addTodo(todoInput.value); // call addTodo function with input box current value
});

// function to add todo
function addTodo(item) {
  // if item is not empty
  if (item !== '') {
    // make a todo object, which has id, name, and completed properties
    const todo = {
      id: Date.now(),
      name: item
    };

    // then add it to todos array
    todos.push(todo);
    addToLocalStorage(todos); // then store it in localStorage

    // finally clear the input box value
    todoInput.value = '';
  }
}

// function to render given todos to screen
function renderTodos(todos) {
  // clear everything inside <ul> with class=todo-items
  todoItemsList.innerHTML = '';

  // run through each item inside todos
  todos.forEach(function(item) {

    const li = document.createElement('li');
    
    li.setAttribute('class', 'item');
    li.setAttribute('data-key', item.id);

    li.innerHTML = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      ${item.name}
      
    </li>
    `;

    // <i class="far fa-trash-alt delete"></i>
    // finally add the <li> to the <ul>
    todoItemsList.append(li);
  });

}

// function to add todos to local storage
function addToLocalStorage(todos) {
  // conver the array to string then store it.
  localStorage.setItem('todos', JSON.stringify(todos));
  // render them to screen
  renderTodos(todos);
}

// function helps to get everything from local storage
function getFromLocalStorage() {
  const reference = localStorage.getItem('todos');
  // if reference exists
  if (reference) {
    // converts back to array and store it in todos array
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}


// // deletes a todo from todos array, then updates localstorage and renders updated list to screen
function deleteTodo(id) {
  
    // filters out the <li> with the id and updates the todos array
    
      todos = todos.filter(function(item) {
        
    // use != not !==, because here types are different. One is number and other is string
    
        return item.id != id;
      });

      addToLocalStorage(todos);
}
// initially get everything from localStorage
getFromLocalStorage();

// after that addEventListener <ul> with class=todoItems. Because we need to listen for click event in all delete-button and checkbox
todoItemsList.addEventListener('click', function(event) {

  // check if that is a delete-button
  if (event.target.classList.contains('delete')) {
    // get id from data-key attribute's value of parent <li> where the delete-button is present
    // event.target.parentElement.remove();
  }
  deleteTodo(event.target.parentElement.getAttribute('data-key'));
});

const searchTodos = (term) => {

    Array.from(list.children)
        .filter((todo) => !todo.textContent.toLowerCase().includes(term))  // qajo array qe doenst INCLUDE THE TERM, bohet hide
        .forEach((todo) => todo.classList.add('filtered')); // add the css class

    Array.from(list.children)
        .filter((todo) =>  todo.textContent.includes(term))
        .forEach((todo) => todo.classList.remove('filtered')); // remove the css class
    
};

search.addEventListener('keyup', () => {
    const term = search.value.trim().toLowerCase();
    searchTodos(term);
});