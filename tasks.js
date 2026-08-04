// ===============================
// LOAD DATA
// ===============================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let projects = JSON.parse(localStorage.getItem("projects")) || [];


// ===============================
// ELEMENTS
// ===============================

const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const taskProject = document.getElementById("taskProject");
const taskDate = document.getElementById("taskDate");
const taskPriority = document.getElementById("taskPriority");
const taskStatus = document.getElementById("taskStatus");
const addTaskBtn = document.getElementById("addTask");
const tasksContainer = document.getElementById("tasks");


// ===============================
// LOAD PROJECTS DROPDOWN
// ===============================

function loadProjects(){

    taskProject.innerHTML = `
        <option value="">
        Select Project
        </option>
    `;

    projects.forEach(project=>{

        taskProject.innerHTML += `

        <option value="${project.name}">
            ${project.name}
        </option>

        `;

    });

}
// ===============================
// SAVE TASKS
// ===============================

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}

// ===============================
// CLEAR FORM
// ===============================

function clearForm(){

    taskTitle.value="";

    taskDescription.value="";

    taskProject.value="";

    taskDate.value="";

    taskPriority.value="High";

    taskStatus.value="Todo";

}
// ===============================
// DISPLAY TASKS
// ===============================

function displayTasks(){


    tasksContainer.innerHTML="";

    if(tasks.length===0){

        tasksContainer.innerHTML=`

        <p>
        No tasks created yet.
        </p>

        `;

        return;

    }

    tasks.forEach((task,index)=>{


        tasksContainer.innerHTML += `


        <div class="task-card 
        ${task.status==="Completed" ? "task-complete":""}">


            <h3>
            ${task.title}
            </h3>

            <p>
            ${task.description}
            </p>

            <div class="task-info">


                <span class="task-badge task-${task.priority.toLowerCase()}">

                ${task.priority}

                </span>

                <span class="task-badge task-status-${task.status.toLowerCase().replace(/\s+/g, '-')}">

                ${task.status}

                </span>



                <span class="task-badge">

                ${task.project}

                </span>


            </div>


            <p>
            Due:
            ${task.date || "No Date"}
            </p>


            <br>
            <button 
            onclick="completeTask(${index})"
            class="edit-btn">

            Complete

            </button>
            <button
            onclick="deleteTask(${index})"
            class="delete-btn">

            Delete

            </button>



        </div>


        `;


    });


}
// ===============================
// ADD TASK
// ===============================

addTaskBtn.addEventListener("click",()=>{


    if(taskTitle.value.trim()===""){

        alert("Task title required");

        return;

    }
    let task={


        title:taskTitle.value,


        description:taskDescription.value,


        project:taskProject.value,


        date:taskDate.value,


        priority:taskPriority.value,


        status:taskStatus.value


    };
    tasks.push(task);

    saveTasks();


    displayTasks();


    clearForm();


});
// ===============================
// COMPLETE TASK
// ===============================

function completeTask(index){


    tasks[index].status="Completed";


    saveTasks();


    displayTasks();


}
// ===============================
// DELETE TASK
// ===============================

function deleteTask(index){


    if(confirm("Delete this task?")){


        tasks.splice(index,1);


        saveTasks();


        displayTasks();


    }

}
// ===============================
// INITIAL LOAD
// ===============================

loadProjects();

displayTasks();