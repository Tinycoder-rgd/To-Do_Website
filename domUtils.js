import { getTasks, deleteTask, toggleTaskStatus } from './taskManager.js';

export const renderTasks = () => {
    console.log('renderTasks called');
    
    const taskList = document.getElementById('task-list');
    if (!taskList) {
        console.error('Task list container not found');
        return;
    }

    taskList.innerHTML = ''; // Clear the list before re-rendering
    
    const tasks = getTasks();
    console.log('Tasks retrieved:', tasks);

    // Handle empty or invalid tasks
    if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
        console.log('No tasks found, showing empty state');
        taskList.innerHTML = `
            <div class="empty-state">
                <p>No tasks found</p>
                <p>Click "Add Task" to create your first task</p>
            </div>
        `;
        return;
    }

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.add('task-item');

        // Checkbox to toggle task completion
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            toggleTaskStatus(task.id);
            renderTasks();
        });

        // Task details container
        const taskDetails = document.createElement('div');
        taskDetails.className = 'task-details';
        
        // Task Title
        const taskTitle = document.createElement('span');
        taskTitle.textContent = task.title;
        if (task.completed) taskTitle.classList.add('completed');
        
        // Task Description
        if (task.description) {
            const taskDescription = document.createElement('p');
            taskDescription.className = 'task-description';
            taskDescription.textContent = task.description;
            taskDetails.appendChild(taskDescription);
        }

        // Task Due Date
        const taskDueDate = document.createElement('span');
        taskDueDate.className = 'task-due-date';
        if (task.dueDate) {
            const dueDate = new Date(task.dueDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (dueDate < today) {
                taskDueDate.classList.add('overdue');
                taskDueDate.textContent = `Overdue: ${dueDate.toLocaleDateString()}`;
            } else {
                taskDueDate.textContent = `Due: ${dueDate.toLocaleDateString()}`;
            }
        }

        // Buttons for Edit and Delete
        const editBtn = document.createElement('button');
        editBtn.textContent = '✏️';
        editBtn.className = 'task-edit-btn';
        editBtn.title = 'Edit task';
        editBtn.addEventListener('click', () => {
            window.location.href = `add-task.html?edit=${task.id}`;
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑';
        deleteBtn.className = 'task-delete-btn';
        deleteBtn.title = 'Delete task';
        deleteBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this task?')) {
                deleteTask(task.id);
                renderTasks();
            }
        });

        // Assemble Task Item
        li.appendChild(checkbox);
        taskDetails.appendChild(taskTitle);
        taskDetails.appendChild(taskDueDate);
        li.appendChild(taskDetails);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
};
