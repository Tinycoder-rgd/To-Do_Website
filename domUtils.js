import { getTasks, deleteTask, toggleTaskStatus } from './taskManager.js';

export const renderTasks = () => {
    console.log('Rendering tasks...');

    const taskList = document.getElementById('task-list');
    if (!taskList) {
        console.error('Task list container not found.');
        return;
    }

    taskList.innerHTML = ''; // Clear previous tasks
    const tasks = getTasks();

    if (!tasks.length) {
        taskList.innerHTML = `<div class="empty-state"><p>No tasks found. Add a task!</p></div>`;
        return;
    }

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.add('task-item');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            toggleTaskStatus(task.id);
            renderTasks();
        });

        const taskDetails = document.createElement('div');
        taskDetails.className = 'task-details';

        const taskTitle = document.createElement('span');
        taskTitle.textContent = task.title;
        if (task.completed) taskTitle.classList.add('completed');

        if (task.description) {
            const taskDescription = document.createElement('p');
            taskDescription.className = 'task-description';
            taskDescription.textContent = task.description;
            taskDetails.appendChild(taskDescription);
        }

        const taskDueDate = document.createElement('span');
        if (task.dueDate) {
            const dueDate = new Date(task.dueDate);
            taskDueDate.textContent = `Due: ${dueDate.toLocaleDateString()}`;
        }

        const editBtn = document.createElement('button');
        editBtn.textContent = '✏️';
        editBtn.className = 'task-edit-btn';
        editBtn.addEventListener('click', () => {
            window.location.href = `add-task.html?edit=${task.id}`;
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑';
        deleteBtn.className = 'task-delete-btn';
        deleteBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this task?')) {
                deleteTask(task.id);
                renderTasks();
            }
        });

        taskDetails.appendChild(taskTitle);
        taskDetails.appendChild(taskDueDate);
        li.appendChild(checkbox);
        li.appendChild(taskDetails);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
};
