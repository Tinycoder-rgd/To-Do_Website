const TaskManager = {
    getTasks: function () {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    },

    saveTasks: function (tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    },

    addTask: function (name, dueDate) {
        let tasks = this.getTasks();
        tasks.push({ name, dueDate, completed: false });
        this.saveTasks(tasks);
    },

    updateTask: function (index, name, dueDate) {
        let tasks = this.getTasks();
        tasks[index] = { name, dueDate, completed: tasks[index].completed };
        this.saveTasks(tasks);
    },

    toggleTaskCompletion: function (index) {
        let tasks = this.getTasks();
        tasks[index].completed = !tasks[index].completed;
        this.saveTasks(tasks);
    },

    deleteTask: function (index) {
        let tasks = this.getTasks();
        tasks.splice(index, 1);
        this.saveTasks(tasks);
    }
};
