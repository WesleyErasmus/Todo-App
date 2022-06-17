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

    
    })

    
})

function printTasksToDOM() {
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

    innerHTML = 
    parentNode.appendChild(childNode);

    taskItem.appendChild(taskLabel);
    taskItem.appendChild(childNode);
    taskItem.appendChild(childNode);
    taskItem.appendChild(childNode);
    taskLabel.appendChild(taskInput);
    taskLabel.appendChild(taskCategory);
    taskInput.appendChild(childNode);
    taskCategory.appendChild(childNode);
    taskTitle.appendChild(childNode);
    editDeleteContainer.appendChild(childNode);
    editButton.appendChild(childNode);
    deleteButton.appendChild(childNode);
    showDescription.appendChild(childNode);
    taskDescription.appendChild(childNode);





}

