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
        // the name ="content" value from the id="content" input field
        // the name ="category" value from the lables withing the class="category-selectors" input fields
        const task = {
            content: e.target.elements.content.value,
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


}

