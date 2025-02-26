document.addEventListener('DOMContentLoaded', function () {
    // Ensure task list renders on `index.html`
    const taskList = document.getElementById('task-list');
    if (taskList) {
        DOMUtils.renderTasks();
    }

    // Ensure task form handling only happens on `add-task.html`
    const taskForm = document.getElementById('task-form');
    if (taskForm) {
        const urlParams = new URLSearchParams(window.location.search);
        const taskId = urlParams.get('id');

        if (taskId !== null) {
            document.getElementById('task-name').value = urlParams.get('name') || '';
            document.getElementById('task-date').value = urlParams.get('dueDate') || '';
        }

        taskForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const taskName = document.getElementById('task-name').value.trim();
            const taskDate = document.getElementById('task-date').value.trim();
            const today = new Date().toISOString().split('T')[0];

            if (!taskName) {
                alert('❌ Please enter a task name.');
                return;
            }
            if (!taskDate) {
                alert('❌ Please enter a due date.');
                return;
            }
            if (taskDate < today) {
                alert('❌ The due date must be today or later.');
                return;
            }

            if (taskId !== null) {
                TaskManager.updateTask(taskId, taskName, taskDate);
            } else {
                TaskManager.addTask(taskName, taskDate);
            }

            // Ensure storage updates before redirection
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 100);
        });
    }
});
