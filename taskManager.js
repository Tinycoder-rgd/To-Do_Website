
let tasks = [];

// **Initialize tasks from localStorage**
const initializeTasks = () => {
    try {
        const storedTasks = localStorage.getItem('tasks');
        tasks = storedTasks ? JSON.parse(storedTasks) : [];
    } catch (error) {
        console.error('Error loading tasks from localStorage:', error);
        tasks = [];
    }
};

// Call this function at the start
initializeTasks();

// **Save tasks to localStorage**
const saveTasks = () => {
    try {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        window.dispatchEvent(new Event('storage')); // Trigger update in all tabs
    } catch (error) {
        console.error('Error saving tasks:', error);
    }
};

initializeTasks(); // Run on script load

// **Add Task**
export const addTask = (taskData) => {
    if (!taskData || !taskData.title.trim()) {
        throw new Error('Invalid task data');
    }

    // Prevent duplicate task titles
    const duplicateTask = tasks.find(task => task.title.toLowerCase() === taskData.title.toLowerCase());
    if (duplicateTask) {
        throw new Error('Task with this title already exists');
    }

    const newTask = {
        id: Date.now(),
        title: taskData.title.trim(),
        description: taskData.description?.trim() || '',
        dueDate: taskData.dueDate || null,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
};

// **Edit Task**
export const editTask = (id, updatedData) => {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        throw new Error('Task not found');
    }

    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedData };
    saveTasks();
};

// **Delete Task**
export const deleteTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    if (newTasks.length === tasks.length) {
        throw new Error('Task not found');
    }

    tasks = newTasks;
    saveTasks();
};

// **Toggle Task Completion**
export const toggleTaskStatus = (id) => {
    const task = tasks.find(task => task.id === id);
    if (!task) {
        throw new Error('Task not found');
    }

    task.completed = !task.completed;
    saveTasks();
};

// **Get Tasks (Sorted)**
export const getTasks = () => {
    if (!Array.isArray(tasks)) {
        console.error('Tasks data is corrupted');
        return [];
    }

    return [...tasks].sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
    });
};

// **Listen for localStorage updates (multi-tab support)**
window.addEventListener('storage', (e) => {
    if (e.key === 'tasks') {
        initializeTasks();
    }
});
