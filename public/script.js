document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
  
    // Load saved todos from local storage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
  
    const renderTodos = () => {
      todoList.innerHTML = '';
      todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        if (todo.completed) {
          li.classList.add('completed');
        }
        
        // If you want to add an image icon for each task, uncomment and adjust the code below.
        /*
        const icon = document.createElement('img');
        icon.src = 'images/task-icon.png'; // make sure this image exists in your images folder
        icon.alt = 'Task Icon';
        icon.className = 'task-icon';
        li.appendChild(icon);
        */
        
        const span = document.createElement('span');
        span.textContent = todo.text;
        li.appendChild(span);
  
        const actions = document.createElement('div');
        actions.className = 'todo-actions';
  
        const completeBtn = document.createElement('button');
        completeBtn.className = 'complete-btn';
        completeBtn.textContent = todo.completed ? 'Undo' : 'Complete';
        completeBtn.addEventListener('click', () => {
          todos[index].completed = !todos[index].completed;
          saveAndRender();
        });
        actions.appendChild(completeBtn);
  
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
          todos.splice(index, 1);
          saveAndRender();
        });
        actions.appendChild(deleteBtn);
  
        li.appendChild(actions);
        todoList.appendChild(li);
      });
    };
  
    const saveAndRender = () => {
      localStorage.setItem('todos', JSON.stringify(todos));
      renderTodos();
    };
  
    todoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = todoInput.value.trim();
      if (text !== '') {
        todos.push({ text: text, completed: false });
        todoInput.value = '';
        saveAndRender();
      }
    });
  
    renderTodos();
  });
  