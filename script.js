import { addTask, editTask, getTaskById } from './taskManager.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Loaded.');

    const taskForm = document.getElementById('task-form');
    const titleInput = document.getElementById('task-title');
    const descriptionInput = document.getElementById('task-description');
    const dueDateInput = document.getElementById('task-due-date');
    const submitBtn = document.getElementById('submit-btn');

    // Get query params (for edit mode)
    const urlParams = new URLSearchParams(window.location.search);
    const editTaskId = urlParams.get('edit');

    if (editTaskId) {
        console.log(`Editing task ID: ${editTaskId}`);
        const taskToEdit = getTaskById(Number(editTaskId));
        if (taskToEdit) {
            titleInput.value = taskToEdit.title;
            descriptionInput.value = taskToEdit.description;
            dueDateInput.value = taskToEdit.dueDate;
            submitBtn.textContent = 'Update Task';
        }
    }

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!titleInput.value.trim()) {
            showMessage('Please enter a task title', 'error');
            return;
        }

        const newTask = {
            id: editTaskId ? Number(editTaskId) : null,
            title: titleInput.value.trim(),
            description: descriptionInput.value.trim(),
            dueDate: dueDateInput.value || null,
            completed: false
        };

        if (editTaskId) {
            editTask(newTask);
            showMessage('Task updated successfully!');
        } else {
            addTask(newTask);
            showMessage('Task added successfully!');
        }

        window.location.href = 'index.html'; // Redirect to task list
    });
});

// Show feedback messages
const showMessage = (message, type = 'success') => {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    document.body.prepend(messageDiv);

    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
};
