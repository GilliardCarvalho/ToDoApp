document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // Carregar tarefas do armazenamento local
    loadTasks();

    addTaskButton.addEventListener('click', addTask);
    taskList.addEventListener('click', handleTaskClick);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const task = createTaskElement(taskText);
        taskList.appendChild(task);
        saveTasks();
        taskInput.value = '';
    }

    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const deleteSpan = document.createElement('span');
        deleteSpan.textContent = 'x';
        deleteSpan.classList.add('delete');
        li.appendChild(deleteSpan);

        return li;
    }

    function handleTaskClick(e) {
        if (e.target.classList.contains('delete')) {
            const li = e.target.parentElement;
            taskList.removeChild(li);
            saveTasks();
        }
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(task => {
            tasks.push(task.firstChild.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            tasks.forEach(taskText => {
                const task = createTaskElement(taskText);
                taskList.appendChild(task);
            });
        }
    }
});
