const DOMUtils = {
    renderTasks: function () {
        const taskList = document.getElementById('task-list');
        if (!taskList) return;

        taskList.innerHTML = '';

        const tasks = TaskManager.getTasks();
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = "task-item";

            li.innerHTML = `
                <input type="checkbox" onchange="DOMUtils.toggleTask(${index})" ${task.completed ? 'checked' : ''}>
                <span class="task-text ${task.completed ? 'completed' : ''}">${task.name} - Due: ${task.dueDate}</span>
                <div class="task-buttons">
                    <button onclick="DOMUtils.editTask(${index})">Edit</button>
                    <button onclick="DOMUtils.deleteTask(${index})">Delete</button>
                </div>
            `;

            taskList.appendChild(li);
        });
    },

    toggleTask: function (index) {
        TaskManager.toggleTaskCompletion(index);
        this.renderTasks();
    },

    editTask: function (index) {
        const tasks = TaskManager.getTasks();
        const task = tasks[index];

        window.location.href = `add-task.html?id=${index}&name=${encodeURIComponent(task.name)}&dueDate=${encodeURIComponent(task.dueDate)}`;
    },

    deleteTask: function (index) {
        if (confirm('Are you sure you want to delete this task?')) {
            TaskManager.deleteTask(index);
            this.renderTasks();
        }
    }
};
