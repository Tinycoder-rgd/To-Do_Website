export const getTasks = () => JSON.parse(localStorage.getItem('tasks')) || [];

export const saveTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const addTask = (task) => {
    const tasks = getTasks();
    task.id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    task.completed = false;
    tasks.push(task);
    saveTasks(tasks);
};

export const deleteTask = (id) => {
    const tasks = getTasks().filter(task => task.id !== id);
    saveTasks(tasks);
};

export const toggleTaskStatus = (id) => {
    const tasks = getTasks().map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks(tasks);
};

export const getTaskById = (id) => getTasks().find(task => task.id === id);

export const editTask = (updatedTask) => {
    const tasks = getTasks().map(task => 
        task.id === updatedTask.id ? updatedTask : task
    );
    saveTasks(tasks);
};
