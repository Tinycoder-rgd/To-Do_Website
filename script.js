import { addTask } from './taskManager.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    const taskForm = document.getElementById('task-form');
    if (!taskForm) {
        console.error('Task form not found');
        return; // Ensures the script doesn't continue if the form is missing
    }

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get input fields
        const titleInput = document.getElementById('task-title');
        const descriptionInput = document.getElementById('task-description');
        const dueDateInput = document.getElementById('task-due-date');

        // Check if inputs exist
        if (!titleInput) {
            console.error('Task title input not found');
            return; // Prevents further execution if missing
        }

        if (!titleInput.value.trim()) {
            showMessage('Please enter a task title', 'error');
            return; // Stops form submission if the title is empty
        }

        // Validate due date if provided
        if (dueDateInput && dueDateInput.value) {
            const dueDate = new Date(dueDateInput.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (dueDate < today) {
                showMessage('Due date cannot be in the past', 'error');
                return; // Prevents submission if the due date is invalid
            }
        }

        const newTask = {
            title: titleInput.value.trim(),
            description: descriptionInput ? descriptionInput.value.trim() : '',
            dueDate: dueDateInput ? dueDateInput.value : null
        };

        try {
            addTask(newTask);
            window.dispatchEvent(new Event('storage')); // Ensures task updates across tabs
            showMessage('Task added successfully!');

            // Clear form inputs after successful addition
            titleInput.value = '';
            if (descriptionInput) descriptionInput.value = '';
            if (dueDateInput) dueDateInput.value = '';

        } catch (error) {
            showMessage('Failed to add task. Please try again.', 'error');
            console.error('Error adding task:', error);
            return; // Ensures function exits if task addition fails
        }
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
