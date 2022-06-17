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

    const taskItem = document.createElement("div");
    taskContainer.classList.add("task-item");

    // Checkbox input used to mark tasks as completed
    const taskInput = document.createElement("input");
    input.type = "checkbox";
    input.checked = task.done;

    const taskLabel = document.createElement("label");
    // label used to append a category to task items

    const taskTitle = document.createElement("div");


    const taskCategory = document.createElement("category");
    const editDeleteContainer = document.createElement("div");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const showDescription = document.createElement("button");
    const description = document.createElement("p");







}

