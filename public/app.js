document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render existing tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${task}
                <button onclick="deleteTask(${index})">Delete</button>
            `;
            taskList.appendChild(li);
        });
        // Save to local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add new task
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push(taskText);
            taskInput.value = '';
            renderTasks();
        }
    });

    // Delete task
    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        renderTasks();
    };

    // Initial render
    renderTasks();
});