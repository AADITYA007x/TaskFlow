// ===============================
// LOAD DATA FROM LOCAL STORAGE
// ===============================


let projects = JSON.parse(
    localStorage.getItem("projects")
) || [];


let tasks = JSON.parse(
    localStorage.getItem("tasks")
) || [];


// ===============================
// DASHBOARD COUNTS
// ===============================

function updateDashboard(){

    // Total Projects

    document.getElementById("projectCount").innerText =
    projects.length;



    // Total Tasks

    document.getElementById("taskCount").innerText =
    tasks.length;

    // Completed Tasks

    let completed =
    tasks.filter(task =>
        task.status === "Completed"
    ).length;


    document.getElementById("completedCount").innerText =
    completed;

    // Pending Tasks

    let pending =
    tasks.length - completed;


    document.getElementById("pendingCount").innerText =
    pending;



}


// Run function

updateDashboard();
function updateProgress(){


    let total = tasks.length;


    let completed =
    tasks.filter(task =>
        task.status === "Completed"
    ).length;



    let percentage = 0;


    if(total > 0){

        percentage =
        Math.round(
            (completed / total) * 100
        );

    }



    document.getElementById(
        "progressBar"
    ).style.width =
    percentage + "%";



    document.getElementById(
        "progressText"
    ).innerText =
    percentage + "% Completed";


}


updateProgress();