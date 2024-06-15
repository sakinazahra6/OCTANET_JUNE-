const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

let tasks = [];

addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, done: false });
        renderTasks();
        taskInput.value = '';
    }
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskHTML = `
            <li class="task ${task.done ? 'done' : ''}">
                <input type="checkbox" id="task-${index}" ${task.done ? 'checked' : ''}>
                <label for="task-${index}">${task.text}</label>
                <button class="delete-btn">Delete</button>
            </li>
        `;
        taskList.innerHTML += taskHTML;
    });
}

taskList.addEventListener('click', (e) => {
    if (e.target.tagName === 'INPUT') {
        const taskIndex = e.target.id.split('-')[1];
        tasks[taskIndex].done = !tasks[taskIndex].done;
        renderTasks();
    } else if (e.target.classList.contains('delete-btn')) {
        const taskIndex = e.target.parentNode.querySelector('input').id.split('-')[1];
        tasks.splice(taskIndex, 1);
        renderTasks();
    }
});

renderTasks();