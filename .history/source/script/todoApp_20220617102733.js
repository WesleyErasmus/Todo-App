window.addEventListener('load', () => {
    // tasks is set as a global variable making it accessible to other functions. 
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    // Used || [] to push new tasks to an empty array

    // Declaring to-do-list form where task gets created from user input
    const tasksForm = document.querySelector("#todo-list-form");

    tasksForm.addEventListener("submit", e => {
        // Used to prevent form from refreshing after submit
        e.preventDefault();

        // const task targets the following elements:
        // the name ="title" value. HTML id="title" input field
        // the name ="description" value. HTML id="description" input field
        // the name ="category" value. HTML labels within the class="category-selectors" radio inputs
        const task = {
            title: e.target.elements.title.value,
            description: e.target.elements.description.value,
            category: e.target.elements.category.value,
            // completed: false will set tasks to unchecked / incomplete when tasks are created 
            completed: false,
            // createdAt key creates a date and time stamp for each task
            createdAt: new Date().getTime()
        }

        // adds new tasks to the "tasks" array in localStorage
        tasks.push(task);

        // sets "tasks" to a string (primitive value - string or number) before adding it to the tasks array in localStorage
        localStorage.setItem("tasks", JSON.stringify(tasks));

        // Resets the Tasks form to clear the task input field and the category radio buttons after the task submit button is clicked. 
        e.target.reset();

        printTasksToDOM()
    
    })

    printTasksToDOM()
    
})

function printTasksToDOM() {

    const taskList = document.querySelector("#task-list");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        // <div class="task-item">
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");
        // label used to append task input field and category field to task items
        const taskLabel = document.createElement("label");
        // <input type="checkbox" />
        const taskInput = document.createElement("input");
        taskInput.type = "checkbox";
        taskInput.checked = task.done;
        // <input id="personal-category"> || <input id="work-category">
        const taskCategory = document.createElement("input");
        // Test to see if adding bookmark image is added to the task
        // Google how to add category color to bookmark images
        taskCategory.classList.add(`"<i class="fa-solid fa-bookmark"></i>"`);
        // <div class="task-content">
        const taskContent = document.createElement("div");
        taskContent.classList.add("task-content");
        // <div class="edit-delete">
        const editDeleteContainer = document.createElement("div");
        editDeleteContainer.classList.add("edit-delete");
        // < class="edit">
        const editButton = document.createElement("button");
        editButton.classList.add("edit")
        // <div class="delete">
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete")
        // <button class="show-hide-description">
        const showDescription = document.createElement("button");
        showDescription.classList.add("show-hide-description")
        // <p class="task-description">
        const taskDescription = document.createElement("p");
        taskDescription.classList.add("task-description")

        deleteButton.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`;
        editButton.innerHTML = `<i class="fa-solid fa-pencil"></i>`;
        taskContent.innerHTML = `<input type="text" value="${task.title}" readonly>`;
        taskDescription.innerHTML = `<input type="text" value="${task.description}" readonly>`;

        // Child elements nested within task-item div
        taskItem.appendChild(taskLabel);
        taskItem.appendChild(taskContent);
        taskItem.appendChild(editDeleteContainer);
        // Child elements nested within the task label
        taskLabel.appendChild(taskInput);
        taskLabel.appendChild(taskCategory);
        // Nesting task-description in task-content
        taskContent.appendChild(taskDescription);
        // Edit, Delete, show description buttons nested in edit-delete container
        editDeleteContainer.appendChild(editButton);
        editDeleteContainer.appendChild(deleteButton);
        editDeleteContainer.appendChild(showDescription);


        
        // check to see if personal is case sensitive
        // check if placement of this if statement needs to be moved
        // If statement to delegate task categories
        if (task.category == "Personal") {
            taskCategory.classList.add("personal-category")
        } else {
            taskCategory.classList.add("work-category")
        }
        // This if statement adds a HTML class of "completed". Completed tasks are then styled with text-decoration of line-through
        if (task.completed) {
            taskItem.classList.add("completed")
        }

        // Below are event listeners linked to the following actions:
        // Task check box (which gets check after task is completed)
        // Edit button
        // Delete button
        // Show task description button

        input.addEventListener("complete", (e) => {
            // Check that this code is correct
            task.completed = e.target.elements.checked;
            // storing checked / unchecked status of tasks to JSON localStorage
            localStorage.setItem("tasks", JSON.stringify(tasks));

            printTasksToDOM()
        });

})
}

