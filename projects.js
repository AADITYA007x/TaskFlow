// ==============================
// PROJECT STORAGE
// ==============================

let projects = JSON.parse(localStorage.getItem("projects")) || [];

let editIndex = -1;

// ==============================
// ELEMENTS
// ==============================

const projectName = document.getElementById("projectName");
const projectDescription = document.getElementById("projectDescription");
const projectPriority = document.getElementById("projectPriority");
const projectStatus = document.getElementById("projectStatus");

const addProjectBtn = document.getElementById("addProject");
const projectsContainer = document.getElementById("projects");

// ==============================
// SAVE
// ==============================

function saveProjects(){

    localStorage.setItem(
        "projects",
        JSON.stringify(projects)
    );

}

// ==============================
// CLEAR FORM
// ==============================

function clearForm(){

    projectName.value = "";
    projectDescription.value = "";
    projectPriority.value = "High";
    projectStatus.value = "Planning";

    editIndex = -1;

    addProjectBtn.innerText = "Create Project";

}

// ==============================
// DISPLAY PROJECTS
// ==============================

// function displayProjects(){

//     projectsContainer.innerHTML = "";

//     if(projects.length === 0){

//         projectsContainer.innerHTML = `
//             <p>No projects created yet.</p>
//         `;

//         return;

//     }

//     projects.forEach((project,index)=>{

//         projectsContainer.innerHTML += `

//         <div class="project-card">

//             <h3>${project.name}</h3>

//             <p>${project.description}</p>

//             <br>

//             <span>${project.priority}</span>

//             <span>${project.status}</span>

//             <br><br>

//             <button onclick="editProject(${index})" class="edit-btn">
//                 Edit
//             </button>

//             <button onclick="deleteProject(${index})" class="delete-btn">
//                 Delete
//             </button>

//         </div>

//         `;

//     });

// }
function displayProjects(){

    projectsContainer.innerHTML = "";

    if(projects.length === 0){

        projectsContainer.innerHTML = `
            <p>No projects created yet.</p>
        `;

        return;

    }

    projects.forEach((project,index)=>{

        projectsContainer.innerHTML += `

        <div class="project-card">


            <div class="project-title">

                <h3>${project.name}</h3>

            </div>


            <p>
                ${project.description}
            </p>



            <div class="badges">

                <span class="priority ${project.priority.toLowerCase()}">
                    ${project.priority}
                </span>


                <span class="status ${project.status.toLowerCase()}">
                    ${project.status}
                </span>

            </div>



            <div class="project-progress">

                <div class="progress-fill"></div>

            </div>



            <div class="project-actions">

                <button onclick="editProject(${index})" class="edit-btn">
                    Edit
                </button>


                <button onclick="deleteProject(${index})" class="delete-btn">
                    Delete
                </button>

            </div>


        </div>

        `;

    });

}
// ==============================
// ADD / UPDATE
// ==============================

addProjectBtn.addEventListener("click",()=>{

    const name = projectName.value.trim();
    const description = projectDescription.value.trim();

    if(name === ""){

        alert("Project name is required.");

        return;

    }

    const project = {

        name:name,

        description:description,

        priority:projectPriority.value,

        status:projectStatus.value

    };

    if(editIndex === -1){

        projects.push(project);

    }

    else{

        projects[editIndex] = project;

    }

    saveProjects();

    displayProjects();

    clearForm();

});

// ==============================
// DELETE
// ==============================

function deleteProject(index){

    if(confirm("Delete this project?")){

        projects.splice(index,1);

        saveProjects();

        displayProjects();

    }

}

// ==============================
// EDIT
// ==============================

function editProject(index){

    const project = projects[index];

    projectName.value = project.name;

    projectDescription.value = project.description;

    projectPriority.value = project.priority;

    projectStatus.value = project.status;

    editIndex = index;

    addProjectBtn.innerText = "Update Project";

}

// ==============================
// INITIAL LOAD
// ==============================

displayProjects();