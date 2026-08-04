let projects = JSON.parse(localStorage.getItem("projects")) || [];

const addProjectBtn = document.getElementById("addProject");

const projectList = document.getElementById("projectList");

function saveProjects(){

    localStorage.setItem(
        "projects",
        JSON.stringify(projects)
    );

}

function updateDashboard(){

    document.getElementById("projectCount").innerText =
    projects.length;

}

function displayProjects(){

    projectList.innerHTML = "";

    projects.forEach((project,index)=>{

        const div = document.createElement("div");

        div.className = "project";

        div.innerHTML = `

            <h3>${project.name}</h3>

            <p>${project.description}</p>

            <p><b>Priority:</b> ${project.priority}</p>

            <button onclick="deleteProject(${index})">
                Delete
            </button>

        `;

        projectList.appendChild(div);

    });

    updateDashboard();

}

function deleteProject(index){

    projects.splice(index,1);

    saveProjects();

    displayProjects();

}

addProjectBtn.addEventListener("click",()=>{

    const name =
    document.getElementById("projectName").value.trim();

    const description =
    document.getElementById("projectDescription").value.trim();

    const priority =
    document.getElementById("projectPriority").value;

    if(name===""){

        alert("Enter Project Name");

        return;

    }

    projects.push({

        name,

        description,

        priority

    });

    saveProjects();

    displayProjects();

    document.getElementById("projectName").value="";

    document.getElementById("projectDescription").value="";

});

displayProjects();