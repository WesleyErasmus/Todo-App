window.addEventListener('load', () => {

    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const tasksForm = document.querySelector("#todo-list-form");

    tasksForm.addEventListener("submit", e => {
        e.preventDefault();

        const task = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            completed: false,
            createdAt: new Date().getTime()
        }

        tasks.push(task);

        localStorage.setItem("tasks", JSON.stringify(tasks));

        // Resets the Tasks form
        e.target.reset();

    })

})