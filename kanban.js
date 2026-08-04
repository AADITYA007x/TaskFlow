// ===============================
// LOAD TASKS
// ===============================
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
// ===============================
// ELEMENTS
// ===============================
const todoColumn = document.getElementById("todo");
const progressColumn = document.getElementById("inProgress");
const completedColumn = document.getElementById("completed");
// ===============================
// DISPLAY KANBAN
// ===============================
function displayKanban(){

    todoColumn.innerHTML = "";
    progressColumn.innerHTML = "";
    completedColumn.innerHTML = "";
    tasks.forEach((task,index)=>{

        let card = `

        <div class="kanban-card">

            <h3>
            ${task.title}
            </h3>
            <p>
            ${task.description}
            </p>
            <span class="kanban-badge">
            ${task.priority}
            </span>

            <br><br>

            <select 
            onchange="changeStatus(${index},this.value)">

                <option 
                ${task.status==="Todo"?"selected":""}>
                Todo
                </option>

                <option 
                ${task.status==="In Progress"?"selected":""}>
                In Progress
                </option>

                <option 
                ${task.status==="Completed"?"selected":""}>
                Completed
                </option>
            </select>
        </div>

        `;
        if(task.status==="Todo"){
            todoColumn.innerHTML += card;
        }

        else if(task.status==="In Progress"){
            progressColumn.innerHTML += card;

        }

        else{
            completedColumn.innerHTML += card;
        }


    });


}

// ===============================
// CHANGE STATUS
// ===============================

function changeStatus(index,status){


    tasks[index].status = status;


    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );


    displayKanban();
}
// ===============================
// INITIAL LOAD
// ===============================

displayKanban();