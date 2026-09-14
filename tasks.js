let tasksList = [];
let container = document.createElement("div");
container.classList.add("container-fluid");
document.body.appendChild(container);

let cardElement = document.createElement("div");
cardElement.classList.add("card","d-flex","flex-column","align-items-center","shadow-lg");
container.appendChild(cardElement);

let headingElement = document.createElement("h1");
headingElement.textContent = "Student's Task Manager";
headingElement.classList.add("heading");
cardElement.appendChild(headingElement);

let inputContainer = document.createElement("div");
inputContainer.classList.add("input-container","d-flex","flex-row");
cardElement.appendChild(inputContainer);

let taskInput = document.createElement("input");
taskInput.type = "text";
taskInput.placeholder = "Enter a task";
taskInput.classList.add("task-input");
inputContainer.appendChild(taskInput);

let buttonElement = document.createElement("button");
buttonElement.textContent = "Add Task";
buttonElement.classList.add("btn","btn-primary","add-task-button");
inputContainer.appendChild(buttonElement);

let headingsContainer = document.createElement("div");
headingsContainer.classList.add("d-flex","flex-row");

let totalTasksHeadingContainer = document.createElement("div");
totalTasksHeadingContainer.classList.add("total-tasks-heading-container");

let filterContainer = document.createElement("div");
filterContainer.classList.add("filter-container","d-flex","flex-row");
let total = document.createElement("button");
total.textContent = "Total: " + tasksList.length;
total.classList.add("btn","btn-secondary","filter-button");
filterContainer.appendChild(total);

let completed = document.createElement("button");
completed.textContent = "Completed: " + tasksList.filter(task => task.completed).length;
completed.classList.add("btn","btn-success","filter-button");
filterContainer.appendChild(completed);

let active = document.createElement("button");
active.textContent = "Active: " + tasksList.filter(task => !task.completed).length;
active.classList.add("btn","btn-warning","filter-button");
filterContainer.appendChild(active);
cardElement.appendChild(filterContainer);

let totalTasks = document.createElement("h3");
totalTasks.textContent = "My Tasks: ";
totalTasks.classList.add("total-tasks");
totalTasksHeadingContainer.appendChild(totalTasks);
cardElement.appendChild(totalTasksHeadingContainer);

let taskContainer = document.createElement("div");
taskContainer.classList.add("task-container","d-flex","flex-column");
cardElement.appendChild(taskContainer);

let taskList = document.createElement("ul");
taskList.classList.add("task-list");
taskContainer.appendChild(taskList);

let count = 0;
let labelCount = 0;
function createandAppendTodo(todoObject){
        let todoItem = document.createElement("li");
        todoItem.id = todoObject.id;
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "task-checkbox-" + count;
        count++;
        checkbox.classList.add("task-checkbox");
        todoItem.appendChild(checkbox); 

        let labelElement = document.createElement("label");
        labelElement.textContent = todoObject.task;
        labelElement.id = "task-label-" + labelCount;
        labelCount++;
        labelElement.classList.add("task-label");
        labelElement.setAttribute("for", checkbox.id);
        todoItem.appendChild(labelElement);
        todoItem.classList.add("task-item");

        let editButton = document.createElement("button");
        let editIcon = document.createElement("i");
        editIcon.classList.add("far","fa-edit","edit-icon");
        editButton.classList.add("edit-icon","button");
        editButton.appendChild(editIcon);
        todoItem.appendChild(editButton);
        
        let deleteButton = document.createElement("button");
        let deleteIcon = document.createElement("i");
        deleteIcon.classList.add("far","fa-trash-alt","delete-icon");
        deleteButton.classList.add("delete-icon","button");
        deleteButton.appendChild(deleteIcon);
        todoItem.appendChild(deleteButton);

        checkbox.addEventListener("click",function(){
            strikeThroughTask(checkbox.id,labelElement.id);
        });

        deleteButton.addEventListener("click",function(){
            deleteTask(todoItem);
        });

        editButton.addEventListener("click",function(){
            let newTask = prompt("Edit the task:", todoObject.task);
            if(newTask !== null && newTask.trim() !== ""){
                todoObject.task = newTask.trim();
                todoObject.task = newTask;
                editTask(labelElement.id,todoObject);
            }
            else if(newTask === "") {
                alert("Task cannot be empty. Please enter a valid task.");
            }
        });

        taskList.appendChild(todoItem);
        taskInput.value = "";
    }

for(let i=0;i<tasksList.length;i++){
    createandAppendTodo(tasksList[i]);
}


buttonElement.addEventListener("click",function(){
    let todoObject = {
            id:"task-"+count,
            task:taskInput.value,
            isCompleted:false
        }
        if(todoObject.task === ""){
        alert("Please enter a task");
        return;
        }
        tasksList.push(todoObject);
    createandAppendTodo(todoObject);
});

function strikeThroughTask(checkboxId,labelId,todoObject){
    let checkbox = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    if(checkbox.checked){
        labelElement.classList.add("checked");  
        todoObject.isCompleted = true;
    }
    else {
        labelElement.classList.remove("checked");
        todoObject.isCompleted = false;
    }
}

function deleteTask(todoItem){
    tasksList = tasksList.filter(task => task.id !== todoItem.id);
    taskList.removeChild(todoItem);
}

function editTask(labelId,todoObject){
    let labelElement = document.getElementById(labelId);
    labelElement.textContent = todoObject.task;
}


