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
    // Below clears each element after creating a tasks
    taskList.innerHTML = "";

    // Using a forEach to loop through each taskItem in the tasks array
    // targeting parameter "task" as a callback function
    tasks.forEach(task => {
        // <div class="task-item">
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");
        
        // label used to append task input field and category field to task items
        const taskLabel = document.createElement("label");
        // <input type="checkbox" />
        const taskInput = document.createElement("input");
        // <input id="personal-category"> || <input id="work-category">
        const taskCategory = document.createElement("div"); //check if it should be "label or another type of HTML tag"
        // <div class="task-content">
        const taskContent = document.createElement("div");
        // <div class="edit-delete">
        const editDeleteContainer = document.createElement("div");
        // < class="edit">
        const editButton = document.createElement("button");
        // <div class="delete">
        const deleteButton = document.createElement("button");
        // <button class="show-hide-description">
        const showDescription = document.createElement("button");
        // <p class="task-description">
        const taskDescription = document.createElement("p");

        taskInput.type = "checkbox";
        taskInput.checked = task.completed;

        
         // If statement to delegate task categories
         if (task.category == "Personal") {
            taskCategory.classList.add("personal")
            taskCategory.style.color = "var(--personal)";
        } else {
            taskCategory.classList.add("work")
            taskCategory.style.color = "var(--work)";
        }
        // Adding classes to created HTML elements
        
        taskContent.classList.add("task-content");
        editDeleteContainer.classList.add("edit-delete");
        editButton.classList.add("edit")
        deleteButton.classList.add("delete")
        showDescription.classList.add("show-hide-description")
        taskDescription.classList.add("task-description")

        // Adding content to created HTML elements
        // <i class="fa-solid fa-trash"></i>
        deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        // deleteButton.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`;
        editButton.innerHTML = `<i class="fa-solid fa-pencil"></i>`;
        taskCategory.innerHTML = `<i class="fa-solid fa-bookmark"></i>`;
        taskContent.innerHTML = `<input type="text" class="task-title" value="${task.title}" readonly>`;
        // taskDescription.innerHTML = `<input type="text" value="${task.description}" readonly>`;
        taskDescription.innerHTML = `${task.description}`;
        showDescription.innerHTML = "show description"

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
        // Below code appends each task item to the task-list class
        taskList.appendChild(taskItem);

       

        // This if statement adds a HTML class of "completed". Completed tasks are then styled with text-decoration of line-through
        if (task.completed) {
            taskItem.classList.add("completed");
        }
        // Below are event listeners linked to the following actions:
        // Task check box (which gets check after task is completed)
        // Edit button
        // Delete button
        // Show task description button

        // Change eventListener to change task from unchecked to checked
        taskInput.addEventListener("change", (e) => {
            // Check that this code is correct
            task.completed = e.target.checked;
            // storing checked / unchecked status of tasks to JSON localStorage
            localStorage.setItem("tasks", JSON.stringify(tasks));

            if (task.completed) {
                taskItem.classList.add("completed")
            } else {
                taskInput.classList.remove("completed")
            }
            printTasksToDOM()
        });

        // Edit button click event listener
        editButton.addEventListener('click', (e) => {
            //changes the edit icon to a save icon when clicked
            editButton.innerHTML = `<i class="fa-solid fa-floppy-disk"></i>`
            // targets the task title input field
            const taskInput = taskContent.querySelector("input");
            // removes the readonly attribute allowing text to be edited
            taskInput.removeAttribute("readonly");
            // focus() shows that the text is now editable
            taskInput.focus();
            // addeventlistener 'blur' will stop editing when clicking outside of input field
            taskInput.addEventListener('blur', (e) => {
                taskInput.setAttribute("readonly", true);
                task.title = e.target.value;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                printTasksToDOM()
            })
        })

    // EDIT DESCRIPTION IS NOT WORKING
        // editButton.addEventListener('click', (e) => {
        //     const taskDescription = taskContent.querySelector("p");
        //     taskDescription.removeAttribute("readonly");
        //     taskDescription.focus();
        //     taskDescription.addEventListener('blur', (e) => {
        //         taskDescription.setAttribute("readonly", true);
        //         task.description = e.target.value;
        //         localStorage.setItem("tasks", JSON.stringify(tasks));
        //         printTasksToDOM()
        //     })
        // })

        // Event listener set to delete task on click
        deleteButton.addEventListener('click', (e) => {
            // using filter method to remove task.
            tasks = tasks.filter(i => i != task);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            printTasksToDOM()
        })
})
}