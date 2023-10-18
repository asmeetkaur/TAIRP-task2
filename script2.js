document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const clearTasksButton = document.getElementById("clearTasks");

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                ${task}
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            taskList.appendChild(listItem);
        });
    }

    // Initial rendering of tasks
    renderTasks();

    // Add a new task
    addTaskButton.addEventListener("click", () => {
        const newTask = taskInput.value.trim();
        if (newTask !== "") {
            tasks.push(newTask);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            taskInput.value = "";
            renderTasks();
        }
    });

    // Delete a task
    taskList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const index = e.target.getAttribute("data-index");
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        }
    });

    // Clear all tasks
    clearTasksButton.addEventListener("click", () => {
        localStorage.removeItem("tasks");
        tasks.length = 0;
        renderTasks();
    });
});
