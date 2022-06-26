window.addEventListener("load", () => {
  // tasks is set as a global variable making it accessible to other functions.
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  // Used || [] to push new tasks to an empty array

  // Declaring to-do-list form where task gets created from user input
  const tasksForm = document.querySelector("#task-list-form");

  tasksForm.addEventListener("submit", (e) => {
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
      date: e.target.elements.date.value,
      // completed: false will set tasks to unchecked / incomplete when tasks are created
      completed: false,
      // createdAt key creates a date and time stamp for each task
      createdAt: new Date().getTime(),
    };

     // Task title form validation and styling
     if( title.value === "" ) {
      document.querySelector(".error-validation-message").style.visibility="visible";
      document.querySelector("#title").style.border ="1px solid red";
      document.querySelector("#title").style.borderRadius ="0.7rem"
      return false;
   } else {
      document.querySelector(".error-validation-message").style.visibility="hidden";
      document.querySelector("#title").style.border ="none";
   }

    // adds new tasks to the "tasks" array in localStorage
    tasks.unshift(task);

    // sets "tasks" to a string (primitive value - string or number) before adding it to the tasks array in localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Resets the Tasks form to clear the task input field and the category radio buttons after the task submit button is clicked.
    e.target.reset();

    printTasksToDOM();
  });

  printTasksToDOM();
});


function printTasksToDOM() {
  const taskList = document.querySelector("#task-list");
  // Below clears each element after creating a tasks
  taskList.innerHTML = "";

  // Using a forEach to loop through each taskItem in the tasks array
  // targeting parameter "task" as a callback function
  tasks.forEach((task) => {

    // <div class="task-item">
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");

    // label used to append task input field and category field to task items
    const taskLabel = document.createElement("label");
    // <input type="checkbox" />
    const taskInput = document.createElement("input");
    // <input id="personal-category"> || <input id="work-category">
    const taskCategory = document.createElement("div");
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
    const taskDescription = document.createElement("div");
    const dueDate = document.createElement("div");

    taskInput.type = "checkbox";
    taskInput.checked = task.completed;

    // If statement to delegate task categories
    if (task.category == "Personal") {
      taskCategory.classList.add("personal");
      taskCategory.style.color = "var(--personal)";
    } else {
      taskCategory.classList.add("work");
      taskCategory.style.color = "var(--work)";
    }

    // Adding classes to created HTML elements
    taskLabel.classList.add("task-item-label")
    taskContent.classList.add("task-content");
    editDeleteContainer.classList.add("edit-delete");
    editButton.classList.add("edit");
    deleteButton.classList.add("delete");
    showDescription.classList.add("show-hide-description");
    taskDescription.classList.add("task-description");
    dueDate.classList.add("task-due-date");

    // Adding content to created HTML elements
    deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    editButton.innerHTML = `<i class="fa-solid fa-pencil"></i>`;
    taskCategory.innerHTML = `<i class="fa-solid fa-bookmark"></i>`;
    taskContent.innerHTML = `<input type="text" class="task-title" value="${task.title}" readonly>`;
    taskDescription.innerHTML = `${task.description}`;

    showDescription.innerHTML = "Read description";
    dueDate.innerHTML = `${task.date}`;
    
    // Child elements nested within task-item div
    taskItem.appendChild(taskLabel);
    taskItem.appendChild(taskContent);
    taskItem.appendChild(editDeleteContainer);
    // Child elements nested within the task label
    taskLabel.appendChild(taskInput);
    taskLabel.appendChild(taskCategory);
    // Nesting task-description in task-content
    taskContent.appendChild(taskDescription);
    taskContent.appendChild(showDescription);
    taskContent.appendChild(dueDate);
    // Edit, Delete, show description buttons nested in edit-delete container
    editDeleteContainer.appendChild(editButton);
    editDeleteContainer.appendChild(deleteButton);

    // Below code appends each task item to the task-list class
    taskList.appendChild(taskItem);

    // This if statement adds a HTML class of "completed". Completed tasks are then styled with text-decoration of line-through
    if (task.completed) {
      taskItem.classList.add("completed");
    }

    // Prevents undefined or null due dates from appearing in tasks
    if (dueDate.innerHTML === "") {
      dueDate.innerHTML = ""; 
    } else {
      dueDate.innerHTML = "Date due: " + "</br>" + `${task.date}`;
    }

    // Below are event listeners linked to the following actions:
    // * Task check box (which gets check after task is completed)
    // * Edit button
    // * Delete button
    // * Show task description button

    // This is a change eventListener to change task from unchecked to checked
    taskInput.addEventListener("change", (e) => {
      task.completed = e.target.checked;
      // storing checked / unchecked status of tasks to JSON localStorage
      localStorage.setItem("tasks", JSON.stringify(tasks));

      if (task.completed) {
        taskItem.classList.add("completed");
      } else {
        taskItem.classList.remove("completed");
      }
      printTasksToDOM();
    });

    // Edit button click event listener
    editButton.addEventListener("click", (e) => {
      //changes the edit icon to a save icon when clicked
      editButton.innerHTML = `<i class="fa-solid fa-floppy-disk"></i>`;
      // targets the task title input field
      const taskInput = taskContent.querySelector("input");
      // removes the readonly attribute allowing text to be edited
      taskInput.removeAttribute("readonly");
      // focus() shows that the text is now editable
      taskInput.focus();
      // Changes text color when readonly has been removed
      taskInput.style.color = "#5179b0";
      // addeventlistener 'blur' will stop editing when clicking outside of input field
      taskInput.addEventListener("blur", (e) => {
        taskInput.setAttribute("readonly", true);
        task.title = e.target.value;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        printTasksToDOM();
      });
    });

    // SHOW & HIDE TASK DESCRIPTION

    //Won't display "read description button if there is no description"
    if (taskDescription.innerHTML === "") {
      showDescription.innerHTML = "";
    }
    // If statement to show and hide task description
    showDescription.addEventListener("click", (e) => {
      if (taskDescription.style.display === "block") {
        // shrink content
        showDescription.innerHTML = "Read description";
        taskDescription.style.display = "none";
      } else {
        // expand content
        taskDescription.style.display = "block";
        showDescription.innerHTML = "Hide description";
      }
    });

    // Event listener set to delete task on click
    deleteButton.addEventListener("click", (e) => {
      // using filter method to remove task.
      tasks = tasks.filter((i) => i != task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      printTasksToDOM();
    });
    

    // SORT BY ALPHABET & DATE ***WORK IN PROGRESS***
    // Sort alphabetically
    
  });
  
}
// Sort by date function using onclick
function dateSort() {
  const sortedByDate = tasks.sort((a, b) => a.createdAt - b.createdAt)
  console.log(sortedByDate);
  document.getElementById("task-list").innerHTML = sortedByDate;
}

document.getElementById("task-count").innerHTML = tasks.length;
  
// *** SORTING METHODS ***
// const sortedTasks = task.sort((a, b) => b.date - a.date)
// Slice protects the original array
// const sortedTasks = task.slice().sort((a, b) => b.date - a.date)
// tasks.sort(function(a, b) {
//   let dateA = new Date(a.date), dateB = new Date(b.date)
//   return dateA - dateB
// });
// console.log(tasks)

// tasks.sort((a,b) => new Date(b.date) - new Date(a.date));

// tasks.sort((a,b)=>a.getTime()-b.getTime());